import { Poppins } from 'next/font/google'

// Fonts
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--ff-poppins',
  subsets: ['latin']
})

export const fonts = {
  poppins: poppins.className
}
