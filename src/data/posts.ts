export type Post = {
  slug: string
  title: string
  excerpt: string
  category: 'PCOS' | 'Diabetes' | 'Weight Management'
  date: string // ISO
  readingMinutes: number
  author: string
  /**
   * The cover photo is not stored here — it lives in src/data/images.ts,
   * keyed by this post's slug, so images can be swapped in one place.
   *
   * Lightweight markdown: ##, ###, paragraphs, - lists, 1. lists, **bold**, *italic*, > quote
   */
  body: string
}

export const posts: Post[] = [
  {
    slug: 'pcos-friendly-eating',
    title: 'PCOS-friendly eating: where to actually start',
    excerpt:
      'Most PCOS advice online is a list of foods to avoid. A more useful starting point is how your meals are built and spaced across the day.',
    category: 'PCOS',
    date: '2026-08-14',
    readingMinutes: 6,
    author: 'Ayesha',
    body: `## Why the usual advice falls flat

Search for a PCOS diet and you will find long lists of forbidden foods. Clients arrive having cut out rice, fruit, dairy and sugar — exhausted, still symptomatic, and convinced they have failed at something.

Restriction is rarely the lever that matters. For many women with PCOS, insulin resistance is part of the picture, which means the more useful question is not *which foods are banned* but **how each meal is built and how the day is spaced**.

### Start with meal structure

A meal that combines protein, fibre and a source of fat alongside your carbohydrate produces a gentler blood sugar response than the same carbohydrate on its own. In practice this means:

- Fruit gets a handful of nuts or a spoon of yoghurt
- Roti or rice gets a proper protein portion and vegetables beside it
- Tea and a biscuit becomes tea and something with substance

Nothing is removed. The plate is simply completed.

### Then fix the spacing

Skipping breakfast, grazing through the afternoon and eating heavily late at night is a pattern that works against you. Three reasonably spaced meals — with a planned snack if you need one — give your body a rhythm to settle into.

> The goal is a steadier day, not a smaller one.

## Fibre is the quiet priority

Fibre slows digestion, supports gut health and helps flatten the rise in blood sugar after meals. Chana, daal, beans, oats, vegetables with the skin on, and whole fruit all add up quickly once you are looking for them.

Most people find it easier to *add* fibre than to subtract carbohydrate — and it tends to be the change that sticks.

## Movement after meals

A short walk after your largest meal of the day is one of the highest-return habits in any PCOS plan. Ten or fifteen minutes is enough to make a difference to how that meal is handled.

## What a realistic timeline looks like

Energy and cravings usually shift first, often within a few weeks. Skin changes take longer because of how skin cells turn over. Cycle regularity is typically the slowest marker to respond, and it varies a great deal between individuals.

If your reports include fasting insulin, HbA1c or a hormone panel, bring them to your consultation — they change where we start.

*PCOS nutrition should sit alongside the care of your gynaecologist or endocrinologist. Nothing here replaces their advice or your prescribed treatment.*`,
  },
  {
    slug: 'managing-blood-sugar-through-diet',
    title: 'Managing blood sugar through diet, without giving up roti',
    excerpt:
      'A diabetes diagnosis does not mean a lifetime of separate, joyless meals. It means learning how to build a plate — and when to eat it.',
    category: 'Diabetes',
    date: '2026-07-09',
    readingMinutes: 7,
    author: 'Ayesha',
    body: `## The first thing most people are told

"Stop eating rice and roti." It is the advice almost every newly diagnosed client repeats to me, and it is the reason so many of them give up within a month. A plan that removes the staple of your household is a plan you cannot keep, and one you cannot keep will not help your blood sugar.

The more workable approach is to change **how much**, **what with**, and **when** — rather than **whether**.

### Build the plate, do not empty it

Think of your plate in three parts:

- Half of it vegetables or salad
- A quarter protein — daal, chicken, fish, eggs, meat, paneer
- A quarter your carbohydrate — rice, roti, potato

The carbohydrate stays. It simply stops being the whole meal. This is the single change that moves readings most for the people I work with.

### Spread carbohydrate across the day

Three moderate portions land far more gently than one large evening meal. Eating most of your day's carbohydrate at dinner, after a light or skipped breakfast, is a common pattern — and a difficult one for your body to manage.

> Consistency across the day does more than perfection at any single meal.

## Timing around medication

If you take medication for diabetes, meal timing matters as much as meal content. Some medicines expect food at particular points in the day; skipping or delaying a meal can cause problems. This is exactly the kind of thing we map out in a consultation, using the prescription your doctor has already written.

**Your medication and its dosage are your doctor's decision.** Nutrition supports that treatment — it does not replace or adjust it.

## Practical habits that help

1. Add protein to breakfast rather than eating carbohydrate alone
2. Keep fruit whole instead of juicing it
3. Walk for ten to fifteen minutes after your largest meal
4. Keep an eye on portions of "healthy" items too — nuts, dates and dried fruit add up
5. Plan for weddings, travel and Ramadan in advance rather than improvising

## Reading your own numbers

If you monitor at home, patterns matter more than individual readings. A single high number after a heavy meal tells you little. The same rise after the same meal three times tells you plenty — that is where we make changes.

Bring your log and your most recent reports to your consultation. Together they turn general advice into a plan built for you.

*This article is general information. Always follow the treatment plan set by your physician.*`,
  },
  {
    slug: 'sustainable-weight-loss',
    title: 'Sustainable weight loss: why the slow version wins',
    excerpt:
      'Rapid plans deliver fast numbers and rarely last. Here is what actually separates weight you lose from weight you keep off.',
    category: 'Weight Management',
    date: '2026-06-02',
    readingMinutes: 6,
    author: 'Ayesha',
    body: `## The cycle most people are stuck in

A very restrictive plan produces quick results for two or three weeks. Then life happens — a wedding, a work trip, a bad week — and the plan collapses. The weight returns, often with interest, and the next attempt starts from a more discouraged place.

The problem was never discipline. It was that the plan was never designed to survive an ordinary month.

### What makes a plan survivable

- **It uses food you already eat.** A plan built on ingredients you have to hunt for will not outlast your enthusiasm.
- **It leaves room for real life.** Weddings, travel and family dinners are not failures of the plan; they are part of it.
- **It is only as strict as it needs to be.** The smallest change that produces progress is the one you will still be doing in six months.
- **It protects protein and fibre.** These are what keep you full enough to stay consistent.

## Three things to fix before cutting harder

**Protein at breakfast.** Many people eat almost all their protein in the evening. Moving some to the morning reliably blunts afternoon cravings.

**Sleep.** Short sleep drives appetite up and makes every other decision harder. It is not a side issue.

**Liquid calories.** Chai with sugar several times a day, juices, soft drinks and flavoured coffees can quietly account for a large share of the day's intake.

> Before eating less, look at what you are already eating and when.

## Expect the plateau

Weight does not fall in a straight line. Water shifts of a kilo or two are normal from salt, hormones, stress and digestion — and they can hide genuine fat loss for a couple of weeks at a time.

Weigh under the same conditions, read the weekly average rather than any single day, and track a measurement like your waist alongside it. Most plateaus resolve with patience and a little precision, not with a harder cut.

## The part that actually matters

The question is never how much you can lose in a month. It is how much you are still holding a year later — and whether the way you got there is something you can live with.

That is what a personalized plan is for: not the fastest route down, but the one you can stay on.

*If you have a medical condition or take regular medication, speak to your doctor before making significant dietary changes.*`,
  },
]

export const getPost = (slug?: string) => posts.find((post) => post.slug === slug)

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
