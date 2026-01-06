import { ImprovedQuestion } from './improved-quiz-scoring';

export const improvedQuizQuestions: ImprovedQuestion[] = [
  // Arousal Procrastinator Questions (Q1-Q5)
  {
    id: 1,
    text: "You have a presentation due in 3 weeks. When do you typically start preparing?",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "I start immediately with research and planning",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I plan to start in 2 weeks when the pressure builds",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "I avoid thinking about it until the last week",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I start multiple times but keep stopping and restarting",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 2,
    text: "How do you feel during the final 24 hours before a major deadline?",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "Energized, focused, and performing at my peak",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Anxious and wishing I had started earlier",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Paralyzed trying to perfect every detail",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Overwhelmed by emotions and wanting to give up",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 3,
    text: "You work best when...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "There's immediate urgency and clear time pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You have unlimited time to get things perfect",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "The stakes are low and failure isn't a big deal",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "You have clear structure and external deadlines",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 1, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 4,
    text: "When you complete a project at the last minute, you typically think...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "That was stressful - I should have started earlier",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I did some of my best work under that pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "It's not as good as it could have been with more time",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I'm glad that unpleasant task is finally over",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 5,
    text: "You're most likely to procrastinate when...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "The task is boring and you need excitement to focus",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "You're worried about not meeting expectations",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You can't decide which approach is best",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You lack a clear system for organizing the work",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Avoidant Procrastinator Questions (Q6-Q10)
  {
    id: 6,
    text: "Before starting a challenging project, your biggest concern is...",
    type: 'standard',
    discriminantWeight: 1.3,
    options: [
      {
        text: "Not having enough time pressure to perform well",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Making mistakes or disappointing others",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Choosing the wrong approach or strategy",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Not being organized enough to handle it",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 7,
    text: "You're asked to give feedback on a colleague's work. You...",
    type: 'standard',
    discriminantWeight: 1.3,
    options: [
      {
        text: "Jump in immediately while the request feels urgent",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Delay because you worry about saying the wrong thing",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Spend too long crafting the perfect response",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Procrastinate because giving feedback feels emotionally draining",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 8,
    text: "When you imagine starting a task you've been avoiding, you feel...",
    type: 'standard',
    discriminantWeight: 1.3,
    options: [
      {
        text: "Excited about the challenge and pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Anxious about potential failure or judgment",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Uncertain about how to approach it",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Frustrated because it seems unpleasant or boring",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 9,
    text: "You're most productive in environments where...",
    type: 'standard',
    discriminantWeight: 1.3,
    options: [
      {
        text: "There's high energy and tight deadlines",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Mistakes are okay and learning is encouraged",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Guidelines and expectations are crystal clear",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You have strong organizational systems",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 1, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 10,
    text: "After avoiding a task for weeks, you finally start because...",
    type: 'standard',
    discriminantWeight: 1.3,
    options: [
      {
        text: "The deadline creates the pressure you need",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Someone reassured you or lowered the stakes",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You finally figured out the 'right' way to do it",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You scheduled it and created external accountability",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 1, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Decisional Procrastinator Questions (Q11-Q15)
  {
    id: 11,
    text: "When shopping for something important (car, laptop), you...",
    type: 'standard',
    discriminantWeight: 0.9,
    options: [
      {
        text: "Research quickly then buy when sales pressure kicks in",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Avoid shopping because choices feel overwhelming",
        scores: { arousal: 0, avoidant: 2, decisional: 2, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Research extensively but struggle to commit to a choice",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Postpone the purchase due to poor organization",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 12,
    text: "You have three equally important tasks due this week. You...",
    type: 'standard',
    discriminantWeight: 0.9,
    options: [
      {
        text: "Do whichever has the most imminent deadline",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Feel paralyzed and avoid all three",
        scores: { arousal: 0, avoidant: 2, decisional: 2, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Spend excessive time creating the perfect priority system",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Jump randomly between them without clear order",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 13,
    text: "When facing multiple good options, you typically...",
    type: 'standard',
    discriminantWeight: 0.9,
    options: [
      {
        text: "Go with your gut feeling quickly",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Worry about making the wrong choice and disappointing people",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Analyze endlessly trying to find the optimal decision",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Get distracted and let the decision make itself",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 0, emotionRegulation: 1 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 14,
    text: "You delay starting projects primarily because...",
    type: 'standard',
    discriminantWeight: 0.9,
    options: [
      {
        text: "You work better with deadline pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "You're afraid of not doing well enough",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You can't decide on the best approach to take",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Tasks feel emotionally unpleasant or draining",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 15,
    text: "When receiving conflicting advice from different people, you...",
    type: 'standard',
    discriminantWeight: 0.9,
    options: [
      {
        text: "Feel energized by the challenge of sorting it out",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Feel anxious about disappointing someone",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Get stuck unable to choose which advice to follow",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Avoid dealing with the advice entirely",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 0, emotionRegulation: 2 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // More Perfectionist Questions (Q16-Q20)
  {
    id: 16,
    text: "You're writing an important document. You typically...",
    type: 'standard',
    discriminantWeight: 1.1,
    options: [
      {
        text: "Write it quickly in a high-energy burst near the deadline",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Draft it but revise endlessly, never feeling it's ready",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Postpone writing because you can't decide on the perfect structure",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Avoid starting because writing feels tedious",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 17,
    text: "When you submit work, you usually...",
    type: 'standard',
    discriminantWeight: 1.1,
    options: [
      {
        text: "Feel satisfied that deadline pressure helped you perform",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Worry about how others will judge it",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Wish you had more time to make it better",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Feel relieved the unpleasant task is over",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 2 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 18,
    text: "Your relationship with quality standards is best described as...",
    type: 'standard',
    discriminantWeight: 1.1,
    options: [
      {
        text: "I do quality work when energized by pressure",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I care about quality but fear my work won't be good enough",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I want perfection but struggle to decide what that looks like",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I have high standards but poor systems for achieving them",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 1, passive: 2, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 19,
    text: "You're most likely to delay finishing a project when...",
    type: 'standard',
    discriminantWeight: 1.1,
    options: [
      {
        text: "You need deadline pressure to push through the final details",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You're worried people will find flaws in your work",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You keep finding new ways to potentially improve it",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "The final steps feel boring or emotionally draining",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 20,
    text: "When learning a new skill, you prefer to...",
    type: 'standard',
    discriminantWeight: 1.1,
    options: [
      {
        text: "Jump in and learn through intensive, pressured practice",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Practice privately until you're good enough to show others",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Master each foundation perfectly before moving forward",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Follow a structured, systematic learning program",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 2, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Passive Procrastinator Questions (Q21-Q25)
  {
    id: 21,
    text: "Your biggest challenge with time management is...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "You don't feel motivated without deadline pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You avoid scheduling tasks that might lead to failure",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You spend too much time planning the perfect schedule",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You lack consistent systems for tracking and organizing",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 22,
    text: "When you miss a deadline, it's usually because...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "You misjudged how much pressure you'd need",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "You avoided the task due to anxiety or fear",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You got stuck deciding how to approach it",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You lost track of time and forgot about it",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 23,
    text: "Your ideal productivity system would...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "Create natural urgency and pressure for all tasks",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Reduce the emotional stakes and fear of judgment",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Provide clear decision frameworks for every situation",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Give you strong external structure and accountability",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 24,
    text: "You work most effectively when...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "Deadlines create natural focus and energy",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "The environment feels safe and supportive",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "You have detailed plans and clear expectations",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Someone else helps you stay organized and on track",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 25,
    text: "When you have good intentions to complete tasks but don't follow through, it's because...",
    type: 'standard',
    discriminantWeight: 1.2,
    options: [
      {
        text: "You didn't have enough pressure to maintain motivation",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You got worried about the potential outcomes",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You got stuck on implementation details",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You lacked the organizational systems to maintain progress",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Active Procrastinator Questions (Q26-Q30)
  {
    id: 26,
    text: "Your procrastination generally results in...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "High-quality work completed under optimal pressure",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Adequate work completed with high stress and anxiety",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 2, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Work that meets standards but could have been better",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 2, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Work that gets done but drains your emotional energy",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 27,
    text: "When you delay starting a project, you usually...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Have an intuitive sense of the right timing",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Are avoiding potential negative emotions",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Are waiting for the perfect moment or approach",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Simply lack the organization to begin effectively",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 28,
    text: "You handle multiple competing deadlines by...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Strategically timing each one for maximum efficiency",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Feeling overwhelmed and avoiding the most stressful ones",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Trying to create the perfect system for managing them all",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Working on whichever feels most urgent in the moment",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 0, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 29,
    text: "Your best work typically happens when...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "You've strategically planned for optimal pressure timing",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Stakes are lowered and you feel psychologically safe",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You have unlimited time to refine and perfect",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Tasks align with your emotional state and energy",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 2 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 30,
    text: "When others call your procrastination 'bad,' you think...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "They don't understand my strategic approach to timing",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "They're right - I need to overcome my fears and avoidance",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I could manage my time better with the right systems",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 1, passive: 2, active: 0, emotionRegulation: 0 }
      },
      {
        text: "It's how I cope with emotionally difficult tasks",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Emotion-Regulation Questions (Q31-Q35)
  {
    id: 31,
    text: "You're most likely to procrastinate on tasks that are...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Not urgent enough to create energizing pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "High-stakes with potential for judgment or failure",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Complex with unclear or multiple solution paths",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Boring, frustrating, or emotionally unpleasant",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 32,
    text: "When facing an emotionally difficult task (like a difficult conversation), you...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Wait until urgency forces you to handle it decisively",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Keep postponing it because you fear the negative outcomes",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Spend excessive time planning the perfect approach",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Avoid it because it feels emotionally draining",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 33,
    text: "Your procrastination is most influenced by...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Whether tasks have enough urgency and pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Your fear of negative evaluation or failure",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Your uncertainty about the right way to proceed",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "How pleasant or unpleasant tasks feel emotionally",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 34,
    text: "You delay tasks that require sustained attention when...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "They don't have enough deadline pressure to maintain focus",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You worry about making mistakes during the process",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "You can't decide on the optimal way to maintain focus",
        scores: { arousal: 0, avoidant: 0, decisional: 2, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "The sustained effort feels emotionally taxing or boring",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },
  {
    id: 35,
    text: "Your ideal work environment would minimize...",
    type: 'standard',
    discriminantWeight: 1.0,
    options: [
      {
        text: "Boring routine tasks in favor of high-pressure challenges",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "High-stakes situations where mistakes have consequences",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Ambiguous situations requiring difficult decisions",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Tasks that trigger negative emotions like frustration or boredom",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  // Reverse-coded questions for consistency checking (R1-R5)
  {
    id: 101,
    text: "I generally complete tasks well before their deadlines",
    type: 'reverse-coded',
    fixedOrder: true,
    discriminantWeight: 1.0,
    options: [
      {
        text: "Strongly agree",
        scores: { arousal: -2, avoidant: 0, decisional: 0, perfectionist: 1, passive: -2, active: -1, emotionRegulation: 0 }
      },
      {
        text: "Somewhat agree",
        scores: { arousal: -1, avoidant: 0, decisional: 0, perfectionist: 0, passive: -1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Neutral",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Somewhat disagree",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Strongly disagree",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 2, active: 1, emotionRegulation: 0 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  },

  {
    id: 102,
    text: "I rarely worry about others judging my work",
    type: 'reverse-coded',
    fixedOrder: true,
    discriminantWeight: 1.0,
    options: [
      {
        text: "Strongly agree",
        scores: { arousal: 0, avoidant: -2, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Somewhat agree",
        scores: { arousal: 0, avoidant: -1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Neutral",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Somewhat disagree",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Strongly disagree",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "None of the above describes me",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 },
        isNoneOfAbove: true
      }
    ]
  }

  // Note: This represents a subset of the full 35 questions for demonstration
  // The complete implementation would include all 35 questions with proper weights
];

// Export a function to get the appropriate question set
export function getQuizQuestions(useImprovedVersion: boolean = false): ImprovedQuestion[] {
  if (useImprovedVersion) {
    return improvedQuizQuestions;
  }
  
  // Convert existing questions to improved format for backward compatibility
  const { quizQuestions } = require('./quiz-data');
  return quizQuestions.map((q: any, index: number) => ({
    ...q,
    type: 'standard',
    discriminantWeight: 1.0
  } as ImprovedQuestion));
}