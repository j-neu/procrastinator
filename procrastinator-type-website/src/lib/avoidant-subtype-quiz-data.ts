import { AvoidantSubtypeQuestion } from './avoidant-subtype-scoring';

// 15 questions. Every question offers one option per subtype (Fear of
// Failure, Fear of Success, Self-Handicapping, Task Aversiveness, Autonomy
// Resistance) plus "None of these", so scoring is a simple unweighted tally
// rather than the correlation-adjusted model the main 35-question quiz uses.
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
    text: "You've been putting off starting for days now. Underneath it, the real reason is closer to...",
    options: [
      { text: "I'm worried starting will expose that I can't actually do this well.", subtype: 'fearOfFailure' },
      { text: "I'm worried that doing this well opens the door to more of the same, and I'm not sure I want that.", subtype: 'fearOfSuccess' },
      { text: "I've been busy or distracted, and that gives me something to point to if it turns out badly.", subtype: 'selfHandicapping' },
      { text: "The task itself is tedious or draining. That's really the whole reason.", subtype: 'taskAversiveness' },
      { text: 'I resent being told when and how to do this, so I keep not doing it.', subtype: 'autonomyResistance' },
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
    text: 'Which sentence feels closest to true for you?',
    options: [
      { text: 'A blank page feels safer than a finished one that might get picked apart.', subtype: 'fearOfFailure' },
      { text: 'Being really good at this would change what people expect from me going forward.', subtype: 'fearOfSuccess' },
      { text: "I'd rather have a reason ready than risk it just not being good enough.", subtype: 'selfHandicapping' },
      { text: 'I avoid tasks that are draining or unpleasant, whatever the stakes are.', subtype: 'taskAversiveness' },
      { text: "I avoid tasks more when they feel forced on me by someone else's deadline.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 5,
    text: "Think about the task you're avoiding right now. What's actually underneath the delay?",
    options: [
      { text: "Fear of what happens once it's finished and open to feedback.", subtype: 'fearOfFailure' },
      { text: 'A quiet fear of what comes after doing it well.', subtype: 'fearOfSuccess' },
      { text: 'Setting things up so a bad result already has an explanation.', subtype: 'selfHandicapping' },
      { text: "It's just not enjoyable or worth the effort. No fear involved.", subtype: 'taskAversiveness' },
      { text: "It was assigned or expected by someone else. I didn't choose it.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 6,
    text: 'Picture the moment right after you finally submit the work. What do you feel first?',
    options: [
      { text: "Dread about how it's going to be received.", subtype: 'fearOfFailure' },
      { text: 'Unease about the new expectations that come with it going well.', subtype: 'fearOfSuccess' },
      { text: 'Some relief that the circumstances give me cover either way.', subtype: 'selfHandicapping' },
      { text: "Mostly relief the tedious part is over. Nothing deeper than that.", subtype: 'taskAversiveness' },
      { text: 'Indifference, since it was never really my goal to begin with.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 7,
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
    id: 8,
    text: 'If you imagine someone actually reviewing your work, what do you think about most?',
    options: [
      { text: "Whether they'll notice it's not as good as it should be.", subtype: 'fearOfFailure' },
      { text: "What they'll expect from me next time, if this one goes well.", subtype: 'fearOfSuccess' },
      { text: "Whether they'll know about the circumstances that affected it.", subtype: 'selfHandicapping' },
      { text: "Not much. Reviewing it just isn't something I look forward to.", subtype: 'taskAversiveness' },
      { text: "Not much, since I didn't choose this task in the first place.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    text: "A low-stakes version of the same kind of task comes up: nobody's watching, nothing really rides on it. You...",
    options: [
      { text: "get it done without much trouble, since there's nothing left to fail at.", subtype: 'fearOfFailure' },
      { text: 'still hesitate a little, less about failing and more about starting a pattern.', subtype: 'fearOfSuccess' },
      { text: "still put it off. The excuse-making habit isn't really about the stakes.", subtype: 'selfHandicapping' },
      { text: "still delay it if it's tedious. Low stakes don't make it less boring.", subtype: 'taskAversiveness' },
      { text: 'get it done quickly, since nobody else is dictating how I do it.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 12,
    text: "You just did excellent work on something you'd been avoiding. Your first reaction is closer to...",
    options: [
      { text: "relief that it wasn't judged badly.", subtype: 'fearOfFailure' },
      { text: "a flicker of 'now what happens next.'", subtype: 'fearOfSuccess' },
      { text: 'mild surprise, since part of you expected to need the excuses.', subtype: 'selfHandicapping' },
      { text: "satisfaction that the unpleasant part is finally behind you.", subtype: 'taskAversiveness' },
      { text: 'pride that you did it your own way, on your own terms.', subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 13,
    text: "Someone offers to strip all the stakes off a task you've been avoiding: no grade, no audience, entirely private. You...",
    options: [
      { text: "finally get started, since there's nothing left to fear.", subtype: 'fearOfFailure' },
      { text: 'still hesitate a bit. Good work has a way of getting noticed anyway.', subtype: 'fearOfSuccess' },
      { text: "still stall. It's more habit at this point than fear.", subtype: 'selfHandicapping' },
      { text: 'still avoid it, if it is genuinely tedious or effortful.', subtype: 'taskAversiveness' },
      { text: "get moving right away, now that it's actually on your own terms.", subtype: 'autonomyResistance' },
      { text: 'None of these describes me', subtype: null, isNoneOfAbove: true },
    ],
  },
  {
    id: 14,
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
  {
    id: 15,
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
];
