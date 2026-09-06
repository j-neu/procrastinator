import { AvoidantSubtypeQuestion } from './avoidant-subtype-scoring';

// 10 questions, each testing a distinct angle (finishing, starting, social
// accountability, post-completion emotion, deadline timing, what removes the
// block, lifelong pattern, a stakes-removed test, a hypothetical removal, and
// a direct self-statement) so the quiz doesn't feel like the same question
// asked five different ways. Every question offers one option per subtype
// (Fear of Failure, Fear of Success, Self-Handicapping, Task Aversiveness,
// Autonomy Resistance) plus "None of these", so scoring is a simple
// unweighted tally rather than the correlation-adjusted model the main
// 35-question quiz uses.
export const avoidantSubtypeQuestions: AvoidantSubtypeQuestion[] = [
  {
    id: 1,
    text: 'When you imagine finally sitting down to finish this task, what makes you hesitate most?',
    options: [
      { text: "Finishing it means it can finally be judged, and I might find out it's not good enough.", subtype: 'fearOfFailure' },
      { text: 'Finishing it well means people will expect this level from me every time now.', subtype: 'fearOfSuccess' },
      { text: "If I don't finish, I've got a built-in excuse for however it turns out.", subtype: 'selfHandicapping' },
      { text: "Nothing dramatic. I just don't want to spend the time and effort it takes.", subtype: 'taskAversiveness' },
      { text: "It's not really my priority. Someone else decided this needed to happen, not me.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 2,
    text: "You've been avoiding starting this for over a week. If you're honest with yourself, the delay is really about...",
    options: [
      { text: 'not wanting to find out, once I start, that I might not be capable of this.', subtype: 'fearOfFailure' },
      { text: "a nagging worry that doing this properly sets a precedent I'll have to keep up.", subtype: 'fearOfSuccess' },
      { text: 'keeping my options open, so if it goes badly there is a reason on hand.', subtype: 'selfHandicapping' },
      { text: "the task itself. It's tedious, and that's the whole story.", subtype: 'taskAversiveness' },
      { text: "the fact that I didn't choose this. Someone else did.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 3,
    text: "A friend asks why you still haven't sent the finished draft. Your honest answer would be closer to...",
    options: [
      { text: 'I keep finding more to fix before anyone else sees it.', subtype: 'fearOfFailure' },
      { text: "Once it's out, it's out, and then it's expected of me from now on.", subtype: 'fearOfSuccess' },
      { text: "It's been a rough week, so if it's not great, at least there's a reason.", subtype: 'selfHandicapping' },
      { text: "Honestly, it's just boring to sit down and do it.", subtype: 'taskAversiveness' },
      { text: "Nobody's actually making me, so it's not urgent to me.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 4,
    text: 'Picture the moment right after you finally submit the work. What do you feel first?',
    options: [
      { text: "Dread about how it's going to be received.", subtype: 'fearOfFailure' },
      { text: 'Unease about the new expectations that come with it going well.', subtype: 'fearOfSuccess' },
      { text: 'Some relief that the circumstances give me cover either way.', subtype: 'selfHandicapping' },
      { text: 'Mostly relief the tedious part is over. Nothing deeper than that.', subtype: 'taskAversiveness' },
      { text: 'Indifference, since it was never really my goal to begin with.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 5,
    text: 'You tend to leave things until the last possible moment when...',
    options: [
      { text: 'it matters enough that a bad result would genuinely sting.', subtype: 'fearOfFailure' },
      { text: 'doing it early and well would set a new standard people expect from me.', subtype: 'fearOfSuccess' },
      { text: 'doing it later leaves less time to prepare properly, which doubles as an excuse.', subtype: 'selfHandicapping' },
      { text: "it's neither urgent nor enjoyable, so there's no other reason to start sooner.", subtype: 'taskAversiveness' },
      { text: "someone else set the deadline, and I'm in no hurry to meet it on their terms.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 6,
    text: 'Your procrastination on this kind of task tends to lift when...',
    options: [
      { text: 'someone reassures you the stakes are lower than you think.', subtype: 'fearOfFailure' },
      { text: "you convince yourself that finishing well won't actually change anything.", subtype: 'fearOfSuccess' },
      { text: 'the outcome stops feeling risky, so you no longer need the excuse.', subtype: 'selfHandicapping' },
      { text: 'the task itself gets less tedious, usually by breaking it into smaller pieces.', subtype: 'taskAversiveness' },
      { text: 'you get to choose the timing and approach yourself.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 7,
    text: "Look back at the tasks you've delayed the longest in your life. What do they have in common?",
    options: [
      { text: 'They were the ones where being judged mattered most.', subtype: 'fearOfFailure' },
      { text: "Doing them well would have raised the bar for what's expected of me.", subtype: 'fearOfSuccess' },
      { text: 'I could usually point to something else going on at the time.', subtype: 'selfHandicapping' },
      { text: 'They were just unpleasant or effortful, regardless of the stakes.', subtype: 'taskAversiveness' },
      { text: 'They were requested or assigned by someone else, not chosen by me.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 8,
    text: 'Someone strips every real stake off the task: no grade, no audience, entirely private, no one will ever know the result. You...',
    options: [
      { text: "get it done without much trouble. There's nothing left to fail at.", subtype: 'fearOfFailure' },
      { text: 'still hesitate a little. Good work has a way of getting noticed anyway, private or not.', subtype: 'fearOfSuccess' },
      { text: "still stall. The excuse-making habit isn't really about the stakes.", subtype: 'selfHandicapping' },
      { text: 'still avoid it, if it is genuinely tedious or effortful. Stakes were never the issue.', subtype: 'taskAversiveness' },
      { text: "get moving right away, now that it's actually on your own terms.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 9,
    text: 'If the task vanished tomorrow with zero consequences, what would you actually feel?',
    options: [
      { text: 'Enormous relief, mostly about not being evaluated on it.', subtype: 'fearOfFailure' },
      { text: 'Relief, but also a strange sense of having dodged a bigger commitment.', subtype: 'fearOfSuccess' },
      { text: "Relief that you don't need the excuse anymore.", subtype: 'selfHandicapping' },
      { text: 'Relief, purely because the tedious task is gone.', subtype: 'taskAversiveness' },
      { text: "Relief at being off someone else's hook, not your own.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 10,
    text: 'Of these, which explanation feels closest to the actual truth about why you delay?',
    options: [
      { text: "I'm scared of finding out I'm not good enough.", subtype: 'fearOfFailure' },
      { text: "I'm scared of what happens if I turn out to be good enough.", subtype: 'fearOfSuccess' },
      { text: 'I want a reason ready, just in case.', subtype: 'selfHandicapping' },
      { text: "I just don't want to do something unpleasant.", subtype: 'taskAversiveness' },
      { text: "I don't want to do it on someone else's terms.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
];
