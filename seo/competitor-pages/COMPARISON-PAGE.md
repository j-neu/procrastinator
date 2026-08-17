# Comparison & Alternatives Pages: Build Specs

Site: `procrastitype.jnorthwood.com`
Research date: 2026-08-17
Author for all pages: Jonathan Northwood (`AUTHOR` in `src/lib/seo.ts`)

All copy below follows `writing_style.md`: no em dashes, no banned transitions, no
rule-of-three stacking. Run `python tools/prose_lint.py` before shipping any page.

---

## Why these formats and not classic "X vs Y" SaaS pages

Procrastitype is a free assessment plus a set of paid ebooks, not a software product.
Nobody searches "Procrastitype vs IDR Labs", so a page built on that pattern would rank
for nothing. The three formats below carry the comparison intent that actually has demand
in this niche, ordered by fit to what the site already owns.

| Tier | Format | Why it fits |
|---|---|---|
| 1 | Type vs type ("Active vs Passive Procrastination") | The site has 7 type guides and a correlation matrix already powering "Often Confused With". These queries are concept comparisons, so they need topical depth rather than brand authority. |
| 2 | 7-type comparison table on `/types` | No competitor owns a canonical multi-type chart. Frameworks in the wild are fragmented at 3, 5, and 6 types. |
| 3 | "Best procrastination tests" roundup | The honest way to appear beside IDR Labs and Psychology Today for high-volume test queries. Requires affiliation disclosure. |

---

# TIER 1: Type vs Type Comparison Pages

## URL pattern

```
/types/compare/<type-a>-vs-<type-b>-procrastination
```

Sits under the existing `/types` hub so the cluster stays tight, with a `compare/`
segment so it cannot collide with the existing `/types/<type>-procrastinator` folders.

## Build order

Pairs 2 through 7 come from the correlation matrix in
`src/lib/improved-quiz-scoring.ts`, so the "often confused" claim matches what the
scoring model actually treats as overlapping. Pair 1 is not in that matrix but is the
single most-searched contrast in the whole category, anchored in Chu & Choi (2005).

| # | Page | Correlation | Primary keyword | Priority |
|---|---|---|---|---|
| 1 | Active vs Passive Procrastination | n/a (Chu & Choi contrast) | `active vs passive procrastination` | **Build first** |
| 2 | Arousal vs Active Procrastination | 0.6 | `arousal vs active procrastination` | High |
| 3 | Avoidant vs Perfectionist Procrastination | 0.4 | `perfectionism vs procrastination` | High |
| 4 | Emotion-Regulation vs Avoidant Procrastination | 0.4 | `emotional procrastination vs avoidance` | Medium |
| 5 | Decisional vs Perfectionist Procrastination | 0.3 | `decision paralysis vs perfectionism` | Medium |
| 6 | Decisional vs Avoidant Procrastination | 0.3 | `indecision vs avoidance procrastination` | Low |
| 7 | Passive vs Avoidant Procrastination | 0.2 | `lazy vs avoidant procrastination` | Low |

Build pages 1 to 3, measure, then decide on 4 to 7. Shipping all seven at once against
a domain with no brand footprint invites a thin-cluster problem.

---

## Page template (applies to all Tier 1 pages)

**Target length:** 1,600 to 2,000 words. The benchmark page at Solving Procrastination
runs roughly 3,500 words on this exact topic, but it carries a PhD byline and years of
authority. Match its structure and specificity rather than its length.

### Title tag
`[Type A] vs [Type B] Procrastination: What Actually Separates Them`

Keep under 60 characters where possible. The root template appends `| Procrastitype`,
so do not add a brand suffix yourself. This is the double-suffix bug already fixed once
in `blog/why-you-procrastinate`.

### H1
`[Type A] vs [Type B] Procrastination`

### Metadata
Must route through `pageMetadata()` from `@/lib/seo`. New pages that skip it inherit no
self-referencing canonical, which is the exact bug Phase 1.8 fixed.

```ts
export const metadata = pageMetadata({
  path: '/types/compare/active-vs-passive-procrastination',
  title: 'Active vs Passive Procrastination: What Separates Them',
  description:
    'Active procrastinators choose to delay and perform. Passive procrastinators delay against their own intention. Here is the research-backed difference, and how to tell which one you are.',
  image: '/share-cards/active.png',
})
```

### Section structure

**1. Definitional opener (first 60 words, before any hook)**

Roughly 44% of AI citations come from the first 30% of a page, and the type guides
currently open with a hook rather than a definition. Lead with the definition here.

> Active procrastination is deliberate delay by someone who works well under time
> pressure and still meets the deadline. Passive procrastination is delay that happens
> against your own intention, ending in a rush, a missed deadline, or work you are not
> happy with. Both look identical from the outside on day one. They diverge at the end.

**2. The one-line answer (pull quote, own block)**

Format this as a standalone highlighted block. It is the passage an AI answer lifts.

> The difference is not how long you wait. It is whether you chose to.

**3. Comparison table** (see per-page tables below)

Wrap in `overflow-x: auto` so mobile does not scroll the body horizontally.

**4. "How each one feels from the inside"**

Two subsections, roughly 200 words each, written in second person per `writing_style.md`.
This is where the site can beat the academic write-ups: they describe the constructs,
they do not describe the experience.

**5. "The research behind the split"**

Chu & Choi (2005) for the active/passive distinction, then the criticism. Name the
critics rather than saying "some researchers argue". Steel (2010) questions whether the
subtypes separate empirically at all. Including the criticism is an E-E-A-T gain and
distinguishes the page from the listicles that present the typology as settled.

**6. "Which one are you?"** with the quiz CTA

The intent match here is exact. Someone comparing two types is asking which one they
are, and the site's answer to that question is free and one click away. This is the
strongest conversion moment on the page, stronger than a book CTA.

**7. "If you are actually the other one"** internal links

Link to both `/types/<a>-procrastinator` and `/types/<b>-procrastinator` guides, plus
one sibling comparison page.

**8. Book CTA** (bottom only)

Per-type Payhip link from `src/lib/payhip-links.ts`, fired through the `workbook_click`
analytics event with `placement: 'compare-page'`.

State the price in the CTA: **€5**, store at https://payhip.com/Procrastitype. Payhip
blocks crawlers and the store is not indexed for the brand, so the on-site CTA is the only
place the price is machine-readable at all. A named price also converts better than "get
the book" on a page where the reader has just been told which type they are.

### Byline and dates
Render `components/Byline.tsx` under the H1. `dateModified` must match the visible
`<time>`, which is already the pattern on the type guides.

---

## Page 1 data: Active vs Passive Procrastination

| | Active Procrastinator | Passive Procrastinator |
|---|---|---|
| **Decision to delay** | Deliberate | Happens without a decision |
| **Feeling as deadline nears** | Focused, challenged | Pressured, pessimistic |
| **Time pressure** | Used as fuel | Experienced as threat |
| **Typical outcome** | Meets deadline, quality holds | Rushed, late, or abandoned |
| **Sense of control over time** | High | Low |
| **Emotional aftermath** | Satisfaction | Guilt, self-blame |
| **Research anchor** | Chu & Choi (2005) | Traditional procrastination, Steel (2007) |
| **Is it a problem?** | Often not | Yes |

Source for the active/passive contrast: Chu, A. H. C., & Choi, J. N. (2005), *Rethinking
Procrastination*, The Journal of Social Psychology. Already cited on the homepage
references block, so the citation is consistent sitewide.

## Page 2 data: Arousal vs Active Procrastination

The hardest pair to separate, and the highest correlation in the matrix at 0.6. The
honest framing is that these overlap heavily and the split is about motive.

| | Arousal Procrastinator | Active Procrastinator |
|---|---|---|
| **Core motive** | Wants the adrenaline | Wants the efficiency |
| **Would they delay without the rush?** | No, the rush is the point | Yes, if it still worked |
| **Self-assessment accuracy** | Often overestimates quality under stress | Usually accurate |
| **Quality under pressure** | Variable | Holds up |
| **Risk profile** | Higher, depends on nothing going wrong | Managed |
| **Research anchor** | Ferrari (1991), sensation seeking | Chu & Choi (2005) |

Note in the copy that Procrastitype's own scoring model treats these as 0.6 correlated,
and link that claim to `/research`. Showing the model's own uncertainty is a credibility
gain, not a weakness.

## Page 3 data: Avoidant vs Perfectionist Procrastination

| | Avoidant Procrastinator | Perfectionist Procrastinator |
|---|---|---|
| **What is feared** | Being judged or failing | Producing something flawed |
| **Blocked at** | Starting | Starting and finishing |
| **Inner sentence** | "What if I am not good enough" | "It is not ready yet" |
| **Relationship to standards** | Standards are the threat | Standards are the identity |
| **What finishing feels like** | Relief | Exposure |
| **Research anchor** | Ferrari (1991) | Maladaptive perfectionism literature |
| **Correlation in the model** | 0.4 with perfectionist | 0.4 with avoidant |

---

# TIER 2: The 7-Type Comparison Table

**Where:** `/types`, directly under the H1 and above the individual type sections.
**Status in repo:** already listed as an open item in `tasks.md` Phase 1.9.

Nothing in the current SERP owns a canonical multi-type chart. Published frameworks
split at 3 types (Ferrari), 5, and 6 (Sapadin). A clean 7-row table with a research
column is the most liftable asset the site can publish, and tables are the format AI
answers reproduce wholesale.

| Type | Core driver | The moment it hits | Telltale sign | Research anchor |
|---|---|---|---|---|
| **Arousal** | Craves pressure | Long before the deadline, waiting for the charge | You feel bored working early | Ferrari (1991) |
| **Avoidant** | Fear of judgment | At the first sign the task could expose you | You reorganise instead of starting | Ferrari (1991) |
| **Decisional** | Cannot commit to a choice | Before any work begins | You research options for hours | Ferrari (1991) |
| **Perfectionist** | Impossibly high standards | At starting and again at finishing | Nothing feels ready to send | Maladaptive perfectionism |
| **Passive** | Disorganisation, weak time sense | Continuously, without a decision | You are surprised by the deadline | Chu & Choi (2005) |
| **Active** | Strategic timing | By choice, with the deadline mapped | You delay and still deliver | Chu & Choi (2005) |
| **Emotion-Regulation** | Escaping a bad feeling now | When the task triggers discomfort | You feel better instantly after quitting | Sirois & Pychyl (2013) |

Add one sentence under the table pointing at the quiz, and link each type name to its
guide. That converts the table into the hub's primary internal-linking device.

---

# TIER 3: "Best Procrastination Tests" Roundup

**URL:** `/blog/best-procrastination-tests`
**Title:** `7 Procrastination Tests Compared: Which One Is Worth Your Time`
**Length:** 1,800 to 2,200 words
**Format:** Roundup with mandatory affiliation disclosure

## Mandatory disclosure

Place this above the table, not in a footer:

> Procrastitype runs one of the tests on this list. That is disclosed on its row and in
> the verdict. Every other entry was taken and timed on 2026-08-17, and the details come
> from each provider's own public page.

## Verified comparison data (as of 2026-08-17)

| Test | Questions | Time | Types identified | Free | Signup | Research basis |
|---|---|---|---|---|---|---|
| **Procrastitype** (ours) | 35 | ~5 min | 7, plus a secondary type and a confidence level | Yes | No | Ferrari (1991), Chu & Choi (2005), Steel (2007) |
| IDR Labs | 24 | ~5 min | 7 scored dimensions | Yes | No | Sirois and colleagues, Durham University |
| Psychology Today | 20 | ~3 min | Scored tendencies, not named types | Yes | No | GPS, PPS, IPS, API scales |
| Liven | Not stated | ~3 min | 5 (Perfectionist, Dreamer, Avoider, Crisis-Maker, Overdoer) | Yes | Not stated | Sapadin-style framework |
| Deepwrk | 9 | 2 to 3 min | 4 mechanism-based | Yes | No | Mechanisms cited, no named studies |
| Freudly | 53 | ~10 min | Academic delay reasons | Yes | No | PASS questionnaire |
| LifeHack | Not verified | Not verified | Not verified | Not verified | Not verified | Not verified |

The LifeHack row is deliberately marked unverified rather than guessed. Either take that
test and fill the row before publishing, or drop the row.

## The honest differentiator to lead with

Do not claim to be the most accurate. Nothing in the repo supports that, and the quiz
has not been externally validated. What is defensible and genuinely uncommon:

1. **It reports a secondary type.** Every competing test returns one label. The research
   consensus, including Steel's critique of rigid typologies, is that people blend.
2. **It reports a confidence level.** Procrastitype is the only test on this list that
   tells you when its own answer is weak.
3. **It counts neutral responses.** "None of the above" is available on all 35 questions
   and lowers stated confidence when overused.

On price: every test in the table is free, including this one, so price stays out of the
comparison table. Mention the €5 book once, in the Procrastitype section and in the
verdict, framed as the optional next step. Deepwrk and Liven both route to app
subscriptions at that same moment, so a one-off €5 is a fair contrast to draw, as long as
their pricing is not characterised beyond what their own pages state.

That framing survives scrutiny, which matters more here than on any other page type,
because a roundup that overclaims about named third parties is the one page that can
actually earn a complaint.

## Structure

1. What these tests can and cannot tell you (sets expectations, builds trust)
2. The comparison table
3. One section per test, roughly 150 words, strengths stated honestly
4. "Which to take, depending on what you want" (three scenarios, not a single winner)
5. Methodology and disclosure
6. CTA

---

# Blocking dependencies

Two things in the live site undercut these pages and should be fixed before Tier 2 ships.

## 1. The homepage contradicts the 7-type model

`src/app/HomeClient.tsx`:

- Line 6: the `procrastinationTypes` array holds **6 entries**. Perfectionist is missing.
- Line 169: copy reads "We've mapped the six primary patterns identified in behavioral
  research."
- Line 191: the CTA immediately below reads "Explore All 7 Types in Depth".

`/types` and `/workbooks` both say 7. The quiz scores 7. Publishing a flagship 7-type
comparison table while the homepage says six and shows six is a self-inflicted
credibility problem, and it is the kind of internal inconsistency that suppresses entity
confidence for AI answers.

Fix: add the Perfectionist entry to the array and change "six primary patterns" to seven.

## 2. The homepage overwrites its own title tag

`src/app/page.tsx` sets a 55-character title through `pageMetadata()`. `HomeClient.tsx`
line 75 then runs:

```ts
document.title = 'Procrastitype - Procrastination Quiz: Discover Your Type in 5 Minutes'
```

That is 69 characters and it overwrites the server-rendered title once React mounts,
which undoes the "trim homepage title" fix recorded as complete in Phase 1.8. Delete the
`document.title` assignment and let the metadata stand.

---

# Schema

See `comparison-schema.json` in this folder. Summary of what to use and what to avoid:

| Page | Schema | Note |
|---|---|---|
| Tier 1 comparison pages | `Article` with `Person` author | Reuse `authorJsonLd` from `src/lib/seo.ts` |
| Tier 2 table on `/types` | Existing `ItemList`, optionally `DefinedTermSet` | The page already has ItemList |
| Tier 3 roundup | `ItemList` of the tests | Positions reflect the article order, not a quality ranking |

**Do not add `Product` with `aggregateRating`.** The skill template offers it, and it
does not apply here. There are no collected reviews for the books, and marking up
self-assigned ratings is a self-serving-review policy violation that risks a manual
action. Revisit only once Payhip reviews exist and can be cited.

**Do not add `FAQPage` for SERP benefit.** Google retired FAQ rich results for all sites
on 2026-05-07. Existing FAQ markup should stay, as `tasks.md` already concluded, but do
not add it to new pages expecting a SERP feature.

---

# Open data gaps

| Gap | Impact | How to close |
|---|---|---|
| ~~Book prices~~ **Closed 2026-08-17** | | €5 per book, store at https://payhip.com/Procrastitype. Supplied by the owner, since Payhip returns 403 to crawlers and the store is not indexed for the brand. Maintain by hand and carry an "as of" date wherever it appears. |
| LifeHack test details unverified | One roundup row incomplete | Take the test, or drop the row |
| Author credentials still unstated | Roundups and comparisons lean on E-E-A-T harder than type guides | Open item in `tasks.md` Phase 1.9. A plain statement of lived experience is enough, and inventing a qualification is not an option |
