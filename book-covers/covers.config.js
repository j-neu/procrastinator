// Book cover configuration for the Procrastitype series.
// Each book defines a palette, front-cover text, back-cover blurb, and print
// spine estimate. The generator reads this file and renders all variants.

const SERIES_NAME = "P&nbsp;R&nbsp;O&nbsp;C&nbsp;R&nbsp;A&nbsp;S&nbsp;T&nbsp;I&nbsp;T&nbsp;Y&nbsp;P&nbsp;E";
const EYEBROW_LEFT = "A Field Guide";
const EYEBROW_RIGHT = "For the Stuck";
const AUTHOR = "Jonathan&nbsp;Northwood";
const AUTHOR_PLAIN = "Jonathan Northwood";

const BIO =
  "Jonathan Northwood spent years studying the mechanics of self-defeat " +
  "before finding his own exit. He writes about procrastination, fear, and " +
  "the surprisingly simple mechanisms that keep people stuck.";

// Palette keys:
//   primary — the mid background tone
//   deep    — the darkest gradient stop
//   shade   — the lightest gradient stop
// Keep them muted and dusty so the bone-white type stays readable.

const BOOKS = [
  {
    slug: "avoidance",
    volume: "N&deg;&nbsp;01",
    pages: 88, // estimate for spine width (see generator formula)
    palette: { primary: "#8a9a82", deep: "#6f8169", shade: "#7d8d75" },
    titleLines: ["Avoidance", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Avoidance Procrastination Pattern",
    hook: "The task isn't the problem.",
    blurb: [
      "What's sitting in your stomach right now, that low hum of dread, that is the problem. The email you haven't opened. The decision you've been circling for weeks. The project that seems to grow larger every day you leave it.",
      "You've tried the planners. The systems. The brutal Monday-morning restarts. You've forced yourself through tasks on willpower alone, hating every second, and then collapsed back into avoidance deeper than before. You've quietly concluded that you're just not built for this.",
      "You're wrong. And you're not alone.",
      "Avoidance procrastination is not a character flaw. It's a trap, a loop of fear and relief so automatic you've confused it with your personality. The dread you feel before a task is real. What causes it isn't.",
      "This book does not ask you to push harder. It shows you the trap clearly enough that you stop walking into it. People who've broken out of avoidance don't describe it as a battle won. They describe it as a weight lifted, not because they got tougher, but because the thing they were afraid of turned out to be smoke.",
    ],
  },
  {
    slug: "arousal",
    volume: "N&deg;&nbsp;02",
    pages: 96,
    palette: { primary: "#b97a55", deep: "#96614a", shade: "#aa6f4e" },
    titleLines: ["Arousal", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Arousal Procrastination Pattern",
    hook: "The rush is the trap.",
    blurb: [
      "You don't procrastinate because you're lazy. You procrastinate because waiting feels alive. The deadline looms, the panic arrives, and suddenly you're brilliant. You've told yourself for years that you work best under pressure.",
      "That's the lie at the center of the trap. The pressure isn't making you better. It's making you desperate, and the desperation feels like focus because it's the only way your brain lets you start.",
      "You've tried the planners, the timers, the systems. They always fail, because they solve the wrong problem. You don't need better time management. You need to see that the rush is a drug, not a gift.",
      "This book doesn't ask you to become a dull, steady worker. It shows you that the rush you're protecting was never doing the work. You were. And you can do it without the panic.",
    ],
  },
  {
    slug: "active",
    volume: "N&deg;&nbsp;03",
    pages: 79,
    palette: { primary: "#5b7691", deep: "#40596f", shade: "#506a82" },
    titleLines: ["Active", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Active Procrastination Pattern",
    hook: "Delay is not a strategy. It's a compulsion.",
    blurb: [
      "You call it strategic delay. You're not like the other procrastinators. You deliver. You thrive in the last-minute sprint, and you've built an identity around the heroics of the deadline.",
      "But look honestly at the cycle. The weeks of low-grade dread before the pressure builds. The crash after the all-nighter. The quality you could have had if you'd started while your mind was clear.",
      "Active procrastination isn't a superpower. It's a tolerance you've built to adrenaline, and like any tolerance, it keeps demanding a bigger dose.",
      "This book does not try to slow you down. It shows you that the pressure was never the fuel. It was the tax.",
    ],
  },
  {
    slug: "decisional",
    volume: "N&deg;&nbsp;04",
    pages: 95,
    palette: { primary: "#4f8a8a", deep: "#396b6b", shade: "#457a7a" },
    titleLines: ["Decisional", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Decisional Procrastination Pattern",
    hook: "The perfect choice is the one you never make.",
    blurb: [
      "You don't put things off because you don't care. You put them off because you care too much, and you're waiting for the one right answer that will make regret impossible.",
      "You've stood in the aisle, comparing options. You've built the spreadsheet. You've asked for one more opinion. None of it produces certainty. It produces delay, and delay makes the choice for you by default.",
      "Decision paralysis is not carefulness. It's fear dressed up as diligence, and it costs you more than any wrong choice ever could.",
      "This book does not tell you to stop thinking. It shows you that the trap isn't the risk of choosing wrong. It's the habit of choosing never.",
    ],
  },
  {
    slug: "emotion-regulation",
    volume: "N&deg;&nbsp;05",
    pages: 80,
    palette: { primary: "#8a7a99", deep: "#6b5d78", shade: "#7d6f8c" },
    titleLines: ["Emotion", "Regulation", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Emotion-Regulation Procrastination Pattern",
    hook: "You're not avoiding the task. You're avoiding how it feels.",
    blurb: [
      "It's not that the work is hard. It's that thinking about it produces a feeling you can't stand. Boredom. Anxiety. Overwhelm. So you put it off, and the relief is real, and the habit deepens.",
      "You've tried the schedules, the self-care, the waiting for the right mood. They all fail for the same reason: they treat the feeling as a gate that must open before you can work. It never opens.",
      "The task doesn't care how you feel. You can run from a burning building without being in the mood for running. The feeling is real, but it was never the thing stopping you.",
      "This book does not ask you to become unfeeling. It shows you that doing the work is what repairs the mood, and that waiting for the mood is what keeps it broken.",
    ],
  },
  {
    slug: "passive",
    volume: "N&deg;&nbsp;06",
    pages: 99,
    palette: { primary: "#6d6a9e", deep: "#514e7d", shade: "#605d8d" },
    titleLines: ["Passive", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Passive Procrastination Pattern",
    hook: "The fog is the problem, not you.",
    blurb: [
      "You're not lazy. You're lost. The tasks aren't hard, they're just many, and they've piled up into a fog that hides the next step. You don't know where to start, so you don't.",
      "You've tried the planners, the color-coded systems, the fresh starts. They work for three days, and then the fog rolls back in. Not because you're undisciplined, but because the systems fight the fog with more fog.",
      "Passive procrastination isn't a character flaw. It's a habit of never quite committing, built out of overwhelm and reinforced by relief.",
      "This book is not another productivity system. It clears the fog at the root, so that order becomes something you can see, not something you must force.",
    ],
  },
  {
    slug: "perfectionist",
    volume: "N&deg;&nbsp;07",
    pages: 159,
    palette: { primary: "#6b7078", deep: "#4d525a", shade: "#5d626a" },
    titleLines: ["Perfectionist", "Procrastinator"],
    titleSize: 98,
    subtitle:
      "The Complete Guide to Breaking Your Perfectionist Procrastination Pattern",
    hook: "The standard is the cage.",
    blurb: [
      "You don't procrastinate because you're careless. You procrastinate because the work has to be perfect, and it isn't yet, so you wait for the moment when it will be. That moment never comes.",
      "The notebooks are still beautiful. The plan was flawless. The work never shipped. You've mistaken the standards for the source of your quality, when they've only ever been the source of your silence.",
      "Perfectionism isn't high standards. It's a fear of the flawed result, and it has been grading you harder than anyone else ever will.",
      "This book does not ask you to lower your standards. It shows you that done is a standard, shipped is a standard, and perfect is a ghost that keeps you from reaching any of them.",
    ],
  },
];

module.exports = {
  SERIES_NAME,
  EYEBROW_LEFT,
  EYEBROW_RIGHT,
  AUTHOR,
  AUTHOR_PLAIN,
  BIO,
  BOOKS,
};
