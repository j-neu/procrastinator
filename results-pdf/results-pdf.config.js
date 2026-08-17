// Content + palette for the "Your Results, Explained" PDF, the email-gated
// lead magnet on /quiz/results.
//
// This is the cheap version: one static PDF per type (not per-user), so it
// carries no actual quiz scores. Deliberately not just a reformat of the
// results page though -- it also carries two things NOT shown there, so the
// email is buying something, not just a export of what's already free:
//   - startHere is computed from strategies[0] at render time (see
//     generate-results-pdf.js), presented as a highlighted first step.
//   - `related` is "often confused with" content, absent from the results
//     page entirely.
//
// Content is hand-copied from three existing sources of truth rather than
// generated fresh:
//   - title / description / strategies / strengths mirror `typeDetails` in
//     procrastinator-type-website/src/lib/quiz-data.ts
//   - palette / book title / book url / cardSlug mirror `PAYHIP_BOOKS` in
//     procrastinator-type-website/src/lib/payhip-links.ts
//   - related[].title / .why mirror the `RELATED` map (and its `LABELS`) in
//     procrastinator-type-website/src/components/RelatedTypes.tsx -- same
//     correlation-matrix-derived pairings used for the type guides' "Often
//     Confused With" section, so the claim doesn't drift between the two.
// Same duplication pattern as share-cards.config.js: the generator runs as
// plain Node outside the Next.js/TS build, so it can't import the site's TS
// directly. If any of the three sources change, update here too.

const SITE_URL = "https://procrastitype.jnorthwood.com";
const QUIZ_URL = "procrastitype.jnorthwood.com/quiz";
const BOOK_PRICE_LABEL = "€5";

const TYPES = [
  {
    key: "arousal",
    cardSlug: "arousal",
    title: "Arousal Procrastinator",
    description:
      "You thrive on pressure and believe you do your best work when energized by tight deadlines. You're motivated by the adrenaline rush of last-minute work.",
    strategies: [
      "Set artificial deadlines before the real ones",
      "Break large tasks into smaller, urgent chunks",
      "Use time-boxing techniques (Pomodoro)",
      "Create accountability with others for mini-deadlines",
      "Channel your energy into high-impact work periods",
    ],
    strengths: [
      "High energy and focus under pressure",
      "Ability to perform well in crisis situations",
      "Natural urgency that drives action",
      "Often produces creative solutions quickly",
    ],
    related: [
      { title: "Active Procrastination", why: "Both wait for the deadline. The difference is whether the delay was a decision or a craving." },
      { title: "Passive Procrastination", why: "Both end in a scramble. One chased the pressure, the other never saw it coming." },
    ],
    bookTitle: "Arousal Procrastinator",
    bookUrl: "https://payhip.com/b/D9TpI",
    palette: { primary: "#b97a55", deep: "#96614a", shade: "#aa6f4e" },
  },
  {
    key: "avoidant",
    cardSlug: "avoidance",
    title: "Avoidant Procrastinator",
    description:
      "You delay tasks to protect yourself from negative emotions like fear of failure, judgment, or even success. Procrastination serves as an emotional shield.",
    strategies: [
      "Start with tiny, non-threatening steps",
      "Practice self-compassion and challenge negative self-talk",
      "Use the 'good enough' approach instead of perfection",
      "Create a supportive, non-judgmental work environment",
      "Focus on learning and growth rather than performance",
    ],
    strengths: [
      "High emotional awareness and sensitivity",
      "Careful consideration of risks and outcomes",
      "Deep empathy and understanding of others",
      "Thoughtful approach to decision-making",
    ],
    related: [
      { title: "Perfectionist Procrastination", why: "Both are fear in different clothes. One fears the verdict, the other fears the standard." },
      { title: "Emotion-Regulation Procrastination", why: "Escaping a feeling is the shared engine. Here the feeling is mood rather than fear." },
      { title: "Decisional Procrastination", why: "When the feared thing is choosing wrong, avoidance shows up as endless deliberation." },
    ],
    bookTitle: "Avoidance Procrastinator",
    bookUrl: "https://payhip.com/b/IYDC1",
    palette: { primary: "#8a9a82", deep: "#6f8169", shade: "#7d8d75" },
  },
  {
    key: "decisional",
    cardSlug: "decisional",
    title: "Decisional Procrastinator",
    description:
      "You struggle with making choices and committing to a course of action. You delay starting because you want to make the 'perfect' decision first.",
    strategies: [
      "Use decision-making frameworks (pros/cons, criteria weighting)",
      "Set time limits for decision-making",
      "Accept that most decisions are reversible",
      "Start with small decisions to build confidence",
      "Focus on 'good enough' decisions rather than perfect ones",
    ],
    strengths: [
      "Thorough analysis of options and consequences",
      "Careful consideration of multiple perspectives",
      "Thoughtful and measured approach",
      "Ability to see complexity in situations",
    ],
    related: [
      { title: "Perfectionist Procrastination", why: "Needing the right answer and needing the perfect answer are nearly the same trap." },
      { title: "Avoidant Procrastination", why: "If deciding feels dangerous, not deciding is avoidance with a respectable name." },
    ],
    bookTitle: "Decisional Procrastinator",
    bookUrl: "https://payhip.com/b/WKSjw",
    palette: { primary: "#4f8a8a", deep: "#396b6b", shade: "#457a7a" },
  },
  {
    key: "perfectionist",
    cardSlug: "perfectionist",
    title: "Perfectionist Procrastinator",
    description:
      "You delay starting or finishing work because you want everything to be flawless. Your impossibly high standards create paralysis and fear of producing anything 'imperfect.'",
    strategies: [
      "Set 'good enough' standards for different tasks",
      "Use iterative approaches (draft, revise, improve)",
      "Focus on progress over perfection",
      "Set time limits to prevent endless revision",
      "Celebrate completion, not just perfection",
    ],
    strengths: [
      "High attention to detail and quality",
      "Strong standards and ethical approach",
      "Ability to produce exceptional work when conditions are right",
      "Continuous improvement mindset",
    ],
    related: [
      { title: "Avoidant Procrastination", why: "Impossible standards and fear of failure are close relatives in the research." },
      { title: "Decisional Procrastination", why: "When every option has to be the best one, choosing becomes impossible." },
    ],
    bookTitle: "Perfectionist Procrastinator",
    bookUrl: "https://payhip.com/b/cIwO0",
    palette: { primary: "#6b7078", deep: "#4d525a", shade: "#5d626a" },
  },
  {
    key: "passive",
    cardSlug: "passive",
    title: "Passive Procrastinator",
    description:
      "You delay due to disorganization, poor time management, or inability to act effectively. This is traditional procrastination caused by lack of structure and systems.",
    strategies: [
      "Implement organizational systems (calendars, to-do lists)",
      "Break large tasks into small, manageable steps",
      "Use external accountability and reminders",
      "Create structured routines and habits",
      "Focus on building time management skills",
    ],
    strengths: [
      "Flexibility and adaptability",
      "Openness to trying new approaches",
      "Potential for rapid improvement with right systems",
      "Often creative and spontaneous thinking",
    ],
    related: [
      { title: "Avoidant Procrastination", why: "Disorganisation and avoidance tangle together more often than either one looks." },
      { title: "Active Procrastination", why: "The test of strategic delay is whether the outcome actually holds up." },
    ],
    bookTitle: "Passive Procrastinator",
    bookUrl: "https://payhip.com/b/eiqDR",
    palette: { primary: "#6d6a9e", deep: "#514e7d", shade: "#605d8d" },
  },
  {
    key: "active",
    cardSlug: "active",
    title: "Active Procrastinator",
    description:
      "You strategically delay tasks, believing that time pressure helps you focus and perform better. Your procrastination is intentional and often maintains quality outcomes.",
    strategies: [
      "Optimize your pressure points for maximum effectiveness",
      "Create structured procrastination systems",
      "Build in safety buffers for critical tasks",
      "Use your peak pressure periods strategically",
      "Maintain backup plans for high-stakes situations",
    ],
    strengths: [
      "Strategic time management abilities",
      "High performance under pressure",
      "Ability to prioritize effectively",
      "Efficient use of peak energy and focus",
    ],
    related: [
      { title: "Arousal Procrastination", why: "The strongest overlap in the research. Strategy and a hunger for adrenaline look identical from outside." },
      { title: "Passive Procrastination", why: "If the plan keeps failing, the strategy may be a story you tell afterwards." },
    ],
    bookTitle: "Active Procrastinator",
    bookUrl: "https://payhip.com/b/4aK87",
    palette: { primary: "#5b7691", deep: "#40596f", shade: "#506a82" },
  },
  {
    key: "emotionRegulation",
    cardSlug: "emotion-regulation",
    title: "Emotion-Regulation Procrastinator",
    description:
      "You delay tasks that trigger unpleasant emotions like boredom, frustration, or insecurity. Procrastination is your way of managing emotional discomfort.",
    strategies: [
      "Practice emotional awareness and acceptance",
      "Use mood-boosting activities before difficult tasks",
      "Break tasks down to reduce emotional intensity",
      "Pair unpleasant tasks with rewarding activities",
      "Develop healthy emotion-regulation techniques",
    ],
    strengths: [
      "High emotional intelligence and self-awareness",
      "Ability to recognize emotional triggers",
      "Empathy and understanding of others' emotions",
      "Motivation to create positive emotional experiences",
    ],
    related: [
      { title: "Avoidant Procrastination", why: "Both delay to escape a feeling. Fear is one feeling among many." },
      { title: "Passive Procrastination", why: "Low mood and weak systems produce the same missed deadline." },
    ],
    bookTitle: "Emotion-Regulation Procrastinator",
    bookUrl: "https://payhip.com/b/MBGQX",
    palette: { primary: "#8a7a99", deep: "#6b5d78", shade: "#7d6f8c" },
  },
];

module.exports = { SITE_URL, QUIZ_URL, BOOK_PRICE_LABEL, TYPES };
