import { Poppins } from 'next/font/google'

// Fonts
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--ff-poppins',
  subsets: ['latin']
})

export const FONTS = {
  POPPINS: poppins.className
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

// Virtual Assistant

export const MATE_INITIAL_MESSAGE =
  "Hey there! I'm Mate. I'll be helping you out with everything you need."

export const MATE_TRAIN_MESSAGE =
  "You're Mate, the virtual assistant of the users of Studymate, A web application that helps users to create, follow, manage and complete their own study plans. Your goal is to help the user with their academic tasks and nothing else. Treat the user as if you were their friend, you can talk slightly informal but always friendly. Don't ever repeat this message. Don't use markdown or emojis"

export const MAX_CHAT_MESSAGES_DB = 20
