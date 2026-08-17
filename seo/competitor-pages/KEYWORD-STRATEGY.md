# Comparison Pages: Keyword Strategy & Recommendations

Site: `procrastitype.jnorthwood.com`
Research date: 2026-08-17
Companion files: `COMPARISON-PAGE.md`, `comparison-schema.json`

---

## The core observation

Procrastitype has no brand footprint. An exact-match search for the brand returns nothing
about it, which `tasks.md` Phase 1.9 already recorded. That single fact decides the whole
strategy: **every keyword worth targeting here must be a concept query, not a brand
query.** Comparison pages that depend on people knowing the brand ("Procrastitype vs X")
would target zero demand.

What the site does have is seven research-anchored type guides and a scoring model with a
published correlation matrix. That is an unusual asset, and it maps directly onto
concept-comparison intent, where the ranking requirement is topical depth rather than
domain authority.

---

## Primary keyword targets

### Tier 1: type vs type

| Page | Primary keyword | Secondary | Intent |
|---|---|---|---|
| Active vs Passive | `active vs passive procrastination` | `active procrastination meaning`, `is procrastination always bad` | Informational, comparison |
| Arousal vs Active | `arousal vs active procrastination` | `thrill seeker procrastinator`, `do I work better under pressure` | Informational, self-identification |
| Avoidant vs Perfectionist | `perfectionism vs procrastination` | `is perfectionism procrastination`, `fear of failure procrastination` | Informational, high emotional pull |
| Emotion-Regulation vs Avoidant | `emotional procrastination vs avoidance` | `procrastination is emotion regulation` | Informational |
| Decisional vs Perfectionist | `decision paralysis vs perfectionism` | `analysis paralysis procrastination` | Informational |
| Decisional vs Avoidant | `indecision vs avoidance procrastination` | `why can't I decide what to work on` | Long tail |
| Passive vs Avoidant | `lazy vs avoidant procrastination` | `am I lazy or procrastinating` | Long tail, high emotional pull |

`active vs passive procrastination` is the confirmed anchor. It has a peer-reviewed
literature behind it, a dedicated 3,500-word page at Solving Procrastination, and
coverage at AllBusiness and Cognition Today. Confirmed demand, and beatable, because the
existing coverage explains the constructs without ever telling the reader which one they
are.

`am I lazy or procrastinating` deserves a note. It is the highest emotional-intensity
query in the set and it is the exact objection the site's homepage already answers. Worth
building even though its pair sits last on correlation strength.

### Tier 2: the comparison table

Targets the head terms the pillar page already competes for, by adding the format those
SERPs lack.

| Keyword | Current state |
|---|---|
| `types of procrastinators` | Fragmented SERP. Results split across 3-type, 5-type, and 6-type frameworks. No canonical chart exists. |
| `procrastination types comparison` | No dedicated comparison asset ranking. |
| `7 types of procrastination` | The site's own framing. Currently undermined by the homepage saying six. |
| `which type of procrastinator am I` | Quiz intent. The table is the natural bridge to it. |

### Tier 3: the roundup

| Keyword | Notes |
|---|---|
| `best procrastination test` | Competitive but roundup-shaped. The SERP is currently individual tests, not comparisons of tests. |
| `procrastination test comparison` | Genuinely unserved. |
| `most accurate procrastination test` | Serve carefully. Do not claim to be the answer. |
| `idr labs procrastination test` | Competitor-brand query. Legitimate to target with an honest review section, and the format Google rewards is comparison, not disparagement. |
| `psychology today procrastination test` | Same pattern, higher volume. |

Competitor-brand queries are the one place the site can borrow demand from established
names. This works only if the coverage of those tests is fair and accurate, which is why
the verified data table in `COMPARISON-PAGE.md` matters more than the copy around it.

---

## Content gaps found in the competitive set

Every competing test and article stops at the same three places. These gaps are the
positioning.

1. **No one reports a secondary type.** IDR Labs scores seven dimensions but presents them
   as scores, not as a primary and secondary profile. Liven, Deepwrk, and Psychology
   Today return a single label. Procrastitype reports both, which matches Steel's own
   critique of rigid typologies.
2. **No one reports confidence.** Not one competing test tells the user when its result is
   weak. Procrastitype computes a confidence level and tracks neutral responses. This is
   the most defensible differentiator on the site and it is currently mentioned nowhere in
   any comparison context.
3. **No one connects the type to a next step beyond an app subscription.** Deepwrk and
   Liven route to their own apps. IDR Labs and Psychology Today route nowhere. The type
   guides plus a €5 one-off per-type book is a genuinely different offer, and the
   one-off-versus-subscription contrast is worth stating plainly.

A fourth gap sits in the articles rather than the tests: the write-ups explain what the
types are, and none of them help a reader work out which one they are. The type-vs-type
pages exist to fill exactly that.

---

## Sequencing and dependencies

Order matters here because two of these unblock the others.

```
Fix homepage 6-vs-7 contradiction  ─┐
Remove document.title override     ─┴─→  Tier 2 table on /types
                                              │
                                              ├─→ Tier 1 pages 1-3
                                              │        │
                                              │        └─→ Tier 1 pages 4-7 (only if 1-3 index)
                                              │
                                              └─→ Tier 3 roundup (also needs author credentials)
```

| Step | Depends on | Why |
|---|---|---|
| Homepage fixes | Nothing | Publishing a 7-type flagship table while the homepage says six is self-contradiction that suppresses entity confidence |
| Tier 2 table | Homepage fixes | The table is the canonical statement of the model |
| Tier 1 pages 1-3 | Tier 2 table | The table is their shared parent and internal-link source |
| Tier 1 pages 4-7 | Pages 1-3 indexing | Avoids shipping seven thin siblings into an unproven cluster |
| Tier 3 roundup | Author credentials (`tasks.md` Phase 1.9, still open) | A roundup judging named third parties rests on stated expertise more than any other page type |

---

## How each recommendation could be wrong

Stated plainly so the plan is falsifiable rather than just confident.

| Recommendation | How you would know it failed |
|---|---|
| Type-vs-type pages | After 8 to 10 weeks, GSC shows impressions but position 30+ and near-zero clicks. That means the pages are too thin against the incumbents, and the fix is depth on pages 1 to 3, not more pages. |
| 7-type comparison table | The table earns no featured snippet and no rise in `types of procrastinators` impressions within 6 weeks. That means the SERP wants a listicle, not a chart. |
| Roundup | Impressions concentrate on competitor-brand queries with a sub-1% CTR, meaning the page is being served as a poor answer to navigational intent. Fix by splitting brand-query coverage into its own review pages. |
| The confidence-level differentiator | Nobody engages with it. If `quiz_complete` events show no lift in downstream `workbook_click` after the differentiator is surfaced, the feature matters to you more than to users. |

---

## Leading indicators to watch

Monitor these without re-running an audit.

| Indicator | Where | What good looks like |
|---|---|---|
| Impressions on `active vs passive procrastination` | GSC, Performance, query filter | Any impressions at all within 3 weeks of publishing |
| Average position on `types of procrastinators` | GSC | Movement after the table ships, not after |
| `quiz_start` from `/types/compare/*` | Vercel Analytics, referrer | Comparison pages should convert to quiz starts better than type guides, because the intent is sharper |
| `workbook_click` with `placement: 'compare-page'` | Vercel Analytics | Add this placement value when building |
| "Duplicate, Google chose different canonical" | GSC, Pages | Must stay at zero. New pages that skip `pageMetadata()` will reintroduce it |

---

## Risks worth naming

**Accuracy risk on the roundup.** It is the only planned page that makes factual claims
about named companies. Every figure in the table was verified on 2026-08-17 from each
provider's own public page, and the one row that could not be verified is marked as such
rather than estimated. Keep that discipline, carry the "as of" date visibly, and re-check
quarterly.

**Thin-cluster risk on Tier 1.** Seven comparison pages across seven type guides on a
domain with no authority can read as programmatic. Building three, measuring, then
deciding is the guard against that.

**E-E-A-T risk.** Comparison and roundup pages are judged harder on author expertise than
explainers are, and the author currently has a name but no stated credentials or bio.
`tasks.md` already records that inventing expertise for psychology content is not
acceptable. A plain statement of relevant lived experience closes this, and the books are
already written in that voice.

**Payhip is invisible to search.** The store at https://payhip.com/Procrastitype returns
403 to crawlers and does not appear in results for the brand name. The books are €5 each
(owner-supplied, 2026-08-17), and that price is unverifiable from outside. Two
consequences: the price has to be maintained by hand wherever it appears, and the on-site
CTA is the only machine-readable record of it. The store's absence from the index also
blocks the entire brand-query surface, which is worth investigating separately from the
site-level brand gap already recorded in Phase 1.9.

**Do not add `Product` schema with `aggregateRating`.** There are no collected reviews.
Self-assigned ratings in markup are a self-serving-review policy violation. This is worth
repeating because the comparison-page playbook recommends it by default and it is the one
piece of that playbook that does not transfer to this site.

---

## Sources

- [IDR Labs Procrastination Type Test](https://www.idrlabs.com/procrastination-type/test.php)
- [Psychology Today Procrastination Test](https://www.psychologytoday.com/us/tests/career/procrastination-test)
- [Liven Procrastination Test](https://theliven.com/tests/procrastination-test)
- [Deepwrk Procrastination Test](https://www.deepwrk.io/resources/procrastination-test)
- [Freudly Academic Procrastination Scale (PASS)](https://freudly.ai/tests/academic-procrastination-scale-pass/)
- [LifeHack Procrastination Quiz](https://www.lifehack.org/tools/assessments/procrastination-quiz)
- [Solving Procrastination: Active and Passive Procrastination](https://solvingprocrastination.com/active-passive-procrastination/)
- [Solving Procrastination: Procrastination Types](https://solvingprocrastination.com/procrastination-types/)
- [Chu & Choi (2005) via ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0191886918306172)
