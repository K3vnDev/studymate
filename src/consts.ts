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
  '3D Modeling',
  '3D Animation',
  '2D Animation',
  'Graphic Design',
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Logo & Branding Design',
  'Game Development',
  'Machine Learning',
  'Databases',
  'UI Design',
  'UX Design',
  'Music Theory',
  'Audio Mixing & Mastering',
  'Photography',
  'Video Editing',
  'Motion Graphics',
  'Digital Marketing',
  'Social Media Strategy',
  'Project Management',
  'Productivity',
  'Study Techniques'
] as const

// Virtual assistant
export const MATE_MEET_MESSAGE =
  "Hey there! I'm Mate. I'll be helping you out with everything you need."

export const MAX_MESSAGES_ON_PROMPT = 15

export const USER_PROMPTS = {
  GENERATE_STUDYPLAN: 'Hey Mate, would you create a studyplan for me?'
}

// Chat
export const CHAT_ERROR_MESSAGE = "Sorry, I'm having some trouble right now"

export const CHAT_ON_BOTTOM_SCROLL_THRESHOLD = 20

export const MATE_VALUES = {
  MESSAGE: {
    MAX: 350
  },
  STUDYPLAN: {
    NAME: { MIN: 10, MAX: 30 },
    DESC: { MIN: 70, MAX: 150 },
    TASKGOAL: { MIN: 25, MAX: 60 }
  }
}
