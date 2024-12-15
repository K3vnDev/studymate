import fs from 'node:fs'
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
export const MATE_INITIAL_MESSAGE =
  "Hey there! I'm Mate. I'll be helping you out with everything you need."

// Chat
export const MAX_CHAT_MESSAGES_PROMPT = 15

export const CHAT_ON_BOTTOM_THRESHOLD = 20

export const MATE_RESPONSE_VALUES = {
  MESSAGE: {
    MAX: 300
  },
  STUDYPLAN: {
    NAME: { MIN: 10, MAX: 40 },
    DESC: { MIN: 100, MAX: 200 },
    TASKGOAL: { MIN: 25, MAX: 60 }
  }
}
