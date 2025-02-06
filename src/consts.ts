import { Inter, Poppins } from 'next/font/google'

// Fonts
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin']
})

export const FONTS = {
  POPPINS: poppins.className,
  INTER: inter.className
}

export const CONTENT_JSON = {
  'Content-Type': 'application/json'
} as const

export const EVENTS = {
  ON_CHAT_TRY_AGAIN: 'onchattryagain',
  ON_HIGHLIGHT_BORDER: 'onhighlightborder',
  ON_SHOW_ALERT: 'onshowalert',
  ON_CHAT_SCROLL_DOWN: 'onchatscrolldown'
} as const

export const CATEGORIES = [
  '2D Animation',
  'Graphic Design',
  'Logo & Branding Design',
  'UI/UX Design',
  '3D Modeling',
  '3D Animation',
  'Backend Development',
  'Data Science',
  'Databases',
  'Programming',
  'Web Development',
  'Software Development',
  'Mobile App Development',
  'Game Development',
  'Music Theory',
  'Audio Mixing & Mastering',
  'Sound Design',
  'Machine Learning',
  'Prompt Engineering',
  'Robotics',
  'Video Editing',
  'Visual Effects',
  'Cinematography',
  'Mathematics',
  'Physics',
  'Geometry',
  'Statistics',
  'Photography',

  'Productivity',
  'Study Techniques'
] as const

// Virtual assistant
export const MATE_MESSAGES = {
  MEET: "Hey there! I'm Mate. I'll be helping you out with everything you need.",

  TASKS: {
    DONE: "Congrats on finishing your tasks! 🎉 That's awesome! You've put in some great work, and it totally pays off.",
    NOT_DONE:
      "Hey there! Do you need any help with today's tasks? I'm here to support you and make it easier!"
  }
}
export const MATE_VALUES = {
  MESSAGE: {
    MAX: 350
  },
  STUDYPLAN: {
    NAME: { MIN: 10, MAX: 30 },
    DESC: { MIN: 70, MAX: 150 },
    TASKGOAL: { MIN: 25, MAX: 60 },
    MAX_DAYS: 10
  }
}
export const MAX_MESSAGES_ON_PROMPT = 8
export const MATE_IMAGES_ALT = {
  GREETING: 'Your virtual assistant, Mate, waving its hand at you',
  SITTING: 'Your virtual assistant, Mate, sitting on the floor and looking down'
}

export const PROTECTED_ROUTES = [
  '/studyplan',
  '/studyplan/tasks',
  '/focus',
  '/dashboard',
  '/chat',
  '/chat/studyplan',
  '/profile'
]

// Chat
export const CHAT_ERROR_MESSAGE = "Sorry, I'm having some trouble right now :("
export const USER_PROMPTS = {
  GENERATE_STUDYPLAN: 'Hey Mate, would you help me to create a new studyplan?',
  EXPLAIN_TASKS: 'Hey Mate, would you help me with my next task of today?'
}

export const SCREENS = {
  XS: 576,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  TWO_XL: 1536,
  THREE_XL: 1750
}
