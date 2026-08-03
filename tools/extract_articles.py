import os, re, sys, glob

SRC = os.path.join(os.path.dirname(__file__), "..", "procrastinator-type-website", "src", "app", "types")
OUT = os.path.join(os.path.dirname(__file__), "lint_articles")
os.makedirs(OUT, exist_ok=True)

def extract(path):
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    raw = re.sub(r"<script[\s\S]*?</script>", " ", raw)
    raw = re.sub(r"<[^>]+>", "\n", raw)
    raw = raw.replace("&rsquo;", "'").replace("&lsquo;", "'").replace("&amp;", "&")
    raw = raw.replace("&nbsp;", " ").replace("&quot;", '"').replace("&#39;", "'")
    lines = [re.sub(r"\s+", " ", l).strip() for l in raw.splitlines()]
    lines = [l for l in lines if l and not l.startswith("import ") and not l.startswith("export ")]
    return "\n".join(lines)

for path in glob.glob(os.path.join(SRC, "**", "page.tsx"), recursive=True):
    rel = os.path.relpath(path, SRC).replace(os.sep, "_").replace(".tsx", "")
    with open(os.path.join(OUT, rel + ".md"), "w", encoding="utf-8") as f:
        f.write(extract(path))
    print("wrote", rel + ".md")
