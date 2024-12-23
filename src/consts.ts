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
}

export const EVENTS = {
  ON_CHAT_TRY_AGAIN: 'onchattryagain'
}

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
export const MATE_MEET_MESSAGE =
  "Hey there! I'm Mate. I'll be helping you out with everything you need."

export const MAX_MESSAGES_ON_PROMPT = 8

export const USER_PROMPTS = {
  GENERATE_STUDYPLAN: 'Hey Mate, Would you help me to create a new studyplan?'
}

// Chat
export const CHAT_ERROR_MESSAGE = "Sorry, I'm having some trouble right now"

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
