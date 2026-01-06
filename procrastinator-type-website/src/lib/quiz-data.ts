export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      arousal: number;
      avoidant: number;
      decisional: number;
      perfectionist: number;
      passive: number;
      active: number;
      emotionRegulation: number;
    };
  }[];
}

export interface QuizResult {
  primaryType: string;
  scores: {
    arousal: number;
    avoidant: number;
    decisional: number;
    perfectionist: number;
    passive: number;
    active: number;
    emotionRegulation: number;
  };
  typeDetails: {
    title: string;
    description: string;
    strategies: string[];
    strengths: string[];
  };
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    text: "When you have a big project due in two weeks, what's your immediate reaction?",
    options: [
      {
        text: "I feel energized knowing I have time to build up the perfect amount of pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I feel overwhelmed and want to avoid thinking about it for now",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 2 }
      },
      {
        text: "I immediately start planning but get stuck on which approach to take",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I start researching extensively to make sure I do it perfectly",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I make a mental note but then forget about it until later",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      }
    ]
  },
  {
    id: 2,
    text: "You're writing an important email to your boss. What happens?",
    options: [
      {
        text: "I wait until it's urgent, then write it quickly with focused intensity",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I draft it but keep postponing sending it, worried about their reaction",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "I write multiple versions but can't decide which tone is best",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I revise it endlessly, checking every word and punctuation mark",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I keep meaning to write it but get distracted by other things",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      }
    ]
  },
  {
    id: 3,
    text: "When facing a boring but necessary task (like filing taxes), you...",
    options: [
      {
        text: "Wait until close to the deadline when the pressure makes it feel urgent",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Keep putting it off because you're afraid of making mistakes",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Research different approaches but struggle to commit to one method",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Want to do it perfectly, so you keep preparing and never start",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Intend to do it but lack a system to track and organize the work",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Avoid it because it feels tedious and drains your energy",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 4,
    text: "You have three important tasks due this week. How do you prioritize?",
    options: [
      {
        text: "I do whichever one has the most immediate deadline pressure",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I avoid all three because choosing feels overwhelming",
        scores: { arousal: 0, avoidant: 2, decisional: 2, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 2 }
      },
      {
        text: "I spend excessive time creating the 'perfect' priority system",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I want to do all three perfectly, so I delay starting any of them",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I randomly jump between them without a clear system",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I strategically plan when to do each for maximum effectiveness",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      }
    ]
  },
  {
    id: 5,
    text: "Your friend asks you to help them move this weekend. Your reaction:",
    options: [
      {
        text: "I agree immediately - I work well with urgent, time-bound commitments",
        scores: { arousal: 2, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "I want to help but worry I'll let them down or do something wrong",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I can't decide if I should help or focus on my own priorities",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I agree but then stress about planning the perfect moving strategy",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I say yes but then forget or double-book myself",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I hesitate because physical work feels unpleasant and tiring",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 6,
    text: "When you finally start a task you've been putting off, you typically...",
    options: [
      {
        text: "Feel a surge of energy and work with intense focus",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Still feel anxious and keep expecting something to go wrong",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Second-guess your approach and consider switching methods",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Work slowly and carefully, stopping often to check and revise",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Work inconsistently, getting distracted by other things",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Feel relieved but still struggle with the unpleasant emotions it brings up",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 7,
    text: "You're given a creative project with minimal guidelines. How do you respond?",
    options: [
      {
        text: "I love the freedom but wait until deadline pressure kicks in to get creative",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I feel paralyzed - too much freedom feels risky and judgeable",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I get overwhelmed by all the possibilities and can't choose a direction",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I research extensively to find the 'best' creative approach",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I start enthusiastically but lose track and direction quickly",
        scores: { arousal: 1, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I delay because creative work requires emotional energy I don't have",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 8,
    text: "After completing a project you procrastinated on, you feel...",
    options: [
      {
        text: "Energized and proud - the pressure helped me do great work",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Relieved it's over but dreading the next similar situation",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Frustrated that I wasted so much time deliberating",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Disappointed because it didn't meet my quality standards",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Exhausted from the chaotic, last-minute scramble",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Satisfied that I pushed through despite not wanting to do it",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 1 }
      }
    ]
  },
  {
    id: 9,
    text: "When you have to make a big purchase (like a car or computer), you...",
    options: [
      {
        text: "Research quickly, then buy when sales pressure or deadlines create urgency",
        scores: { arousal: 3, avoidant: 0, decisional: 1, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Avoid shopping because you're worried about making the wrong choice",
        scores: { arousal: 0, avoidant: 3, decisional: 2, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Research extensively but struggle to commit to any decision",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Spend months researching to find the absolutely perfect option",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Keep postponing the purchase because you're disorganized about it",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Delay because shopping and deciding feels overwhelming and draining",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 10,
    text: "Your ideal working style involves...",
    options: [
      {
        text: "Clear deadlines that create natural pressure and energy",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "A supportive environment where mistakes are okay and judgment is minimal",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Detailed guidelines and frameworks for making decisions",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 2, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Unlimited time and resources to achieve the highest quality",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Strong organizational systems and external accountability",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Work that feels meaningful and emotionally rewarding",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 1, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 11,
    text: "When learning a new skill (like a language or instrument), you tend to...",
    options: [
      {
        text: "Sign up for intensive courses or bootcamps with tight schedules",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Avoid practicing in front of others until you're 'good enough'",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 2, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Research many different learning methods but struggle to pick one",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Want to master the fundamentals perfectly before moving forward",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Start enthusiastically but fail to maintain a consistent practice schedule",
        scores: { arousal: 1, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Procrastinate because practice sessions feel tedious or frustrating",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 12,
    text: "You need to have a difficult conversation with someone. What happens?",
    options: [
      {
        text: "I wait until the situation becomes urgent, then handle it decisively",
        scores: { arousal: 3, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I keep postponing it because I'm afraid of conflict or their reaction",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "I can't decide on the right approach or timing for the conversation",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I over-prepare and script out the perfect way to say everything",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I keep meaning to bring it up but never find the right moment",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I avoid it because confrontation feels emotionally draining",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 13,
    text: "When you're given a group project with undefined roles, you...",
    options: [
      {
        text: "Wait to see what others do, then step up when deadlines create pressure",
        scores: { arousal: 3, avoidant: 1, decisional: 1, perfectionist: 0, passive: 1, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Hang back because you're worried about overstepping or being judged",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Struggle with uncertainty about what role to take or how to contribute",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Want to plan everything perfectly before the group starts working",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Struggle to organize your contributions without clear structure",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Procrastinate on group tasks because they feel socially demanding",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 14,
    text: "When you receive feedback on your work, your typical response is...",
    options: [
      {
        text: "I prefer getting feedback close to deadlines when I can act on it immediately",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I appreciate feedback but worry about criticism and negative evaluations",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I get overwhelmed when I receive conflicting feedback from different people",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I want extremely detailed feedback so I can make everything perfect",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I intend to implement feedback but struggle to organize and track changes",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 1, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I delay asking for feedback because criticism feels emotionally difficult",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 15,
    text: "You're planning a vacation that requires booking flights and hotels. You...",
    options: [
      {
        text: "Book everything quickly when deals create time pressure or deadlines",
        scores: { arousal: 3, avoidant: 0, decisional: 1, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Delay booking because you're worried about making wrong choices",
        scores: { arousal: 0, avoidant: 3, decisional: 2, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Research obsessively but can't commit to specific dates or locations",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Spend months researching to find the perfect trip at the perfect price",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Keep postponing the booking process because you're disorganized",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Avoid planning because the research and decisions feel overwhelming",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 16,
    text: "When you have multiple small tasks (emails, bills, calls), you typically...",
    options: [
      {
        text: "Bundle them together and do them all in high-energy bursts",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Avoid the ones that might involve judgment or difficult conversations",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Struggle to decide which order to do them in",
        scores: { arousal: 0, avoidant: 0, decisional: 3, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Want to handle each one perfectly, so you delay starting any",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Lose track of what needs to be done and miss deadlines",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Put them off because they feel tedious and energy-draining",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 17,
    text: "When starting a new job or role, your approach is...",
    options: [
      {
        text: "I perform best once I understand the pressure points and deadlines",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "I take extra time to observe and avoid making early mistakes",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I struggle with uncertainty about expectations and how to prioritize",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 1, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I want to understand everything perfectly before taking on responsibilities",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I struggle to develop efficient systems and often feel behind",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I delay diving in fully because new environments feel emotionally taxing",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 18,
    text: "Your relationship with deadlines is best described as...",
    options: [
      {
        text: "Deadlines energize me and help me focus - they're my friends",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Deadlines create anxiety because they increase the stakes and pressure",
        scores: { arousal: 1, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Deadlines help me decide, but I struggle when they're unclear or flexible",
        scores: { arousal: 1, avoidant: 0, decisional: 3, perfectionist: 0, passive: 1, active: 1, emotionRegulation: 0 }
      },
      {
        text: "Deadlines feel arbitrary and force me to compromise on quality",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I frequently miss deadlines because I lose track of time and priorities",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Deadlines feel stressful and make tasks feel more unpleasant",
        scores: { arousal: 0, avoidant: 2, decisional: 0, perfectionist: 0, passive: 1, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 19,
    text: "When you're working on something and hit an unexpected obstacle, you...",
    options: [
      {
        text: "Feel energized by the challenge and push through with intensity",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 2, emotionRegulation: 0 }
      },
      {
        text: "Worry that the obstacle means you're not capable of completing the task",
        scores: { arousal: 0, avoidant: 3, decisional: 1, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Feel paralyzed trying to decide between different solutions",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Research extensively to find the perfect solution before proceeding",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Get distracted by the obstacle and lose momentum on the whole project",
        scores: { arousal: 0, avoidant: 1, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 1 }
      },
      {
        text: "Feel frustrated and want to abandon the task because it's no longer enjoyable",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 20,
    text: "Looking at your overall work and life patterns, you would say...",
    options: [
      {
        text: "I consistently deliver results when pressure and deadlines are clear",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "I could accomplish more if I wasn't so worried about failure and judgment",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 1 }
      },
      {
        text: "I get stuck in analysis paralysis and struggle to make decisions confidently",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I produce high-quality work but often at the cost of efficiency and timeliness",
        scores: { arousal: 0, avoidant: 0, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I have great intentions but struggle with organization and follow-through",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "I delay things that feel emotionally difficult or energy-draining",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  },
  {
    id: 21,
    text: "When you think about your procrastination, you believe it...",
    options: [
      {
        text: "Actually helps me perform better by creating the right energy and focus",
        scores: { arousal: 3, avoidant: 0, decisional: 0, perfectionist: 0, passive: 0, active: 3, emotionRegulation: 0 }
      },
      {
        text: "Protects me from potential failure and disappointment",
        scores: { arousal: 0, avoidant: 3, decisional: 0, perfectionist: 1, passive: 0, active: 0, emotionRegulation: 2 }
      },
      {
        text: "Reflects my struggle with making decisions and commitments",
        scores: { arousal: 0, avoidant: 1, decisional: 3, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Stems from my high standards and desire to do things right",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 3, passive: 0, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Results from poor organization and time management skills",
        scores: { arousal: 0, avoidant: 0, decisional: 1, perfectionist: 0, passive: 3, active: 0, emotionRegulation: 0 }
      },
      {
        text: "Is my way of avoiding tasks that feel unpleasant or emotionally challenging",
        scores: { arousal: 0, avoidant: 1, decisional: 0, perfectionist: 0, passive: 0, active: 0, emotionRegulation: 3 }
      }
    ]
  }
];

export const typeDetails = {
  arousal: {
    title: "Arousal Procrastinator",
    description: "You thrive on pressure and believe you do your best work when energized by tight deadlines. You're motivated by the adrenaline rush of last-minute work.",
    strategies: [
      "Set artificial deadlines before the real ones",
      "Break large tasks into smaller, urgent chunks",
      "Use time-boxing techniques (Pomodoro)",
      "Create accountability with others for mini-deadlines",
      "Channel your energy into high-impact work periods"
    ],
    strengths: [
      "High energy and focus under pressure",
      "Ability to perform well in crisis situations",
      "Natural urgency that drives action",
      "Often produces creative solutions quickly"
    ]
  },
  avoidant: {
    title: "Avoidant Procrastinator",
    description: "You delay tasks to protect yourself from negative emotions like fear of failure, judgment, or even success. Procrastination serves as an emotional shield.",
    strategies: [
      "Start with tiny, non-threatening steps",
      "Practice self-compassion and challenge negative self-talk",
      "Use the 'good enough' approach instead of perfection",
      "Create a supportive, non-judgmental work environment",
      "Focus on learning and growth rather than performance"
    ],
    strengths: [
      "High emotional awareness and sensitivity",
      "Careful consideration of risks and outcomes",
      "Deep empathy and understanding of others",
      "Thoughtful approach to decision-making"
    ]
  },
  decisional: {
    title: "Decisional Procrastinator",
    description: "You struggle with making choices and committing to a course of action. You delay starting because you want to make the 'perfect' decision first.",
    strategies: [
      "Use decision-making frameworks (pros/cons, criteria weighting)",
      "Set time limits for decision-making",
      "Accept that most decisions are reversible",
      "Start with small decisions to build confidence",
      "Focus on 'good enough' decisions rather than perfect ones"
    ],
    strengths: [
      "Thorough analysis of options and consequences",
      "Careful consideration of multiple perspectives",
      "Thoughtful and measured approach",
      "Ability to see complexity in situations"
    ]
  },
  perfectionist: {
    title: "Perfectionist Procrastinator",
    description: "You delay starting or finishing work because you want everything to be flawless. Your impossibly high standards create paralysis and fear of producing anything 'imperfect.'",
    strategies: [
      "Set 'good enough' standards for different tasks",
      "Use iterative approaches (draft, revise, improve)",
      "Focus on progress over perfection",
      "Set time limits to prevent endless revision",
      "Celebrate completion, not just perfection"
    ],
    strengths: [
      "High attention to detail and quality",
      "Strong standards and ethical approach",
      "Ability to produce exceptional work when conditions are right",
      "Continuous improvement mindset"
    ]
  },
  passive: {
    title: "Passive Procrastinator",
    description: "You delay due to disorganization, poor time management, or inability to act effectively. This is traditional procrastination caused by lack of structure and systems.",
    strategies: [
      "Implement organizational systems (calendars, to-do lists)",
      "Break large tasks into small, manageable steps",
      "Use external accountability and reminders",
      "Create structured routines and habits",
      "Focus on building time management skills"
    ],
    strengths: [
      "Flexibility and adaptability",
      "Openness to trying new approaches",
      "Potential for rapid improvement with right systems",
      "Often creative and spontaneous thinking"
    ]
  },
  active: {
    title: "Active Procrastinator",
    description: "You strategically delay tasks, believing that time pressure helps you focus and perform better. Your procrastination is intentional and often maintains quality outcomes.",
    strategies: [
      "Optimize your pressure points for maximum effectiveness",
      "Create structured procrastination systems",
      "Build in safety buffers for critical tasks",
      "Use your peak pressure periods strategically",
      "Maintain backup plans for high-stakes situations"
    ],
    strengths: [
      "Strategic time management abilities",
      "High performance under pressure",
      "Ability to prioritize effectively",
      "Efficient use of peak energy and focus"
    ]
  },
  emotionRegulation: {
    title: "Emotion-Regulation Procrastinator",
    description: "You delay tasks that trigger unpleasant emotions like boredom, frustration, or insecurity. Procrastination is your way of managing emotional discomfort.",
    strategies: [
      "Practice emotional awareness and acceptance",
      "Use mood-boosting activities before difficult tasks",
      "Break tasks down to reduce emotional intensity",
      "Pair unpleasant tasks with rewarding activities",
      "Develop healthy emotion-regulation techniques"
    ],
    strengths: [
      "High emotional intelligence and self-awareness",
      "Ability to recognize emotional triggers",
      "Empathy and understanding of others' emotions",
      "Motivation to create positive emotional experiences"
    ]
  }
};