<#
.SYNOPSIS
  Post-deploy check that the canonical/domain fix actually reached production.

.DESCRIPTION
  Run this AFTER both halves have shipped:
    1. NEXT_PUBLIC_SITE_URL updated in Vercel (Production + Preview)
    2. the code deployed

  Env var changes only take effect on a NEW build, so a green run here is the
  only real proof the fix landed. Do not resubmit anything in Search Console
  until every check passes.

.EXAMPLE
  pwsh -File scripts/verify-seo.ps1
#>

param(
    [string]$Base = "https://procrastitype.jnorthwood.com"
)

$ErrorActionPreference = "Stop"
$failures = 0

function Test-Check {
    param([string]$Label, [string]$Actual, [string]$Expected)

    $ok = $Actual -eq $Expected
    $mark = if ($ok) { "PASS" } else { "FAIL" }
    $colour = if ($ok) { "Green" } else { "Red" }

    Write-Host ("[{0}] {1}" -f $mark, $Label) -ForegroundColor $colour
    Write-Host ("       got      : {0}" -f $Actual)
    if (-not $ok) {
        Write-Host ("       expected : {0}" -f $Expected) -ForegroundColor Yellow
        $script:failures++
    }
}

Write-Host "Verifying $Base`n" -ForegroundColor Cyan

# 1. Every route must self-canonicalise, not point at the homepage.
$quiz = (Invoke-WebRequest "$Base/quiz" -UseBasicParsing).Content
$canonical = if ($quiz -match '<link rel="canonical" href="([^"]+)"') { $Matches[1] } else { "NONE" }
Test-Check "/quiz canonical is self-referencing" $canonical "$Base/quiz"

# 2. Article JSON-LD must follow siteUrl, not a hardcoded origin.
$typePage = (Invoke-WebRequest "$Base/types/perfectionist-procrastinator" -UseBasicParsing).Content
$mainEntity = if ($typePage -match '"mainEntityOfPage":"([^"]+)"') { $Matches[1] } else { "NONE" }
Test-Check "Article mainEntityOfPage uses live domain" $mainEntity "$Base/types/perfectionist-procrastinator"

# 3. No sitemap entry may still reference the dead domain.
$sitemap = (Invoke-WebRequest "$Base/sitemap.xml" -UseBasicParsing).Content
$stale = ([regex]::Matches($sitemap, 'jnprojects')).Count
Test-Check "sitemap.xml has no stale URLs" $stale.ToString() "0"

# 4. The results page must stay out of the index.
$results = (Invoke-WebRequest "$Base/quiz/results" -UseBasicParsing).Content
$robots = if ($results -match '<meta name="robots" content="([^"]+)"') { $Matches[1] } else { "NONE" }
Test-Check "/quiz/results is noindex" $robots "noindex, follow"

# 5. Share cards should be referenced, not just deployed.
$ogImage = if ($typePage -match '<meta property="og:image" content="([^"]+)"') { $Matches[1] } else { "NONE" }
Test-Check "type guide emits og:image" $ogImage "$Base/share-cards/perfectionist.png"

Write-Host ""
if ($failures -eq 0) {
    Write-Host "All checks passed - safe to resubmit the sitemap in GSC + Bing." -ForegroundColor Green
    exit 0
}

Write-Host "$failures check(s) failed - do NOT resubmit to Search Console yet." -ForegroundColor Red
Write-Host "Most likely cause: the env var changed but no new build ran. Redeploy with" -ForegroundColor Yellow
Write-Host "build cache disabled, then re-run this script." -ForegroundColor Yellow
exit 1
