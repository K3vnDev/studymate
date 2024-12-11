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

export const MATE_INITIAL_MESSAGE =
  "Hey there! I'm Mate. I'll be helping you out with everything you need."
