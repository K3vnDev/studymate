import {
  CameraIcon,
  CodeIcon,
  ComputerCodeIcon,
  CubeIcon,
  GamePadIcon,
  MathIcon,
  MobileCodeIcon,
  PaletteIcon,
  PhotoAndVideoIcon,
  RobotIcon,
  SpeakerIcon
} from '@icons'
import type { Category } from '@types'

type CategoryValues = {
  categories: Category[]
  icon: React.ReactNode
  image: string
}

const categoryValues: CategoryValues[] = [
  {
    categories: ['2D Animation', 'Graphic Design', 'Logo & Branding Design', 'UI/UX Design'],
    icon: <PaletteIcon />,
    image: '2d-design'
  },
  {
    categories: ['3D Animation', '3D Modeling'],
    icon: <CubeIcon />,
    image: '3d-design'
  },
  {
    categories: ['Backend Development', 'Data Science', 'Databases', 'Programming'],
    icon: <CodeIcon />,
    image: 'programming'
  },
  {
    categories: ['Web Development', 'Software Development'],
    icon: <ComputerCodeIcon />,
    image: 'desktop-development'
  },
  {
    categories: ['Mobile App Development'],
    icon: <MobileCodeIcon />,
    image: 'mobile-development'
  },
  {
    categories: ['Game Development'],
    icon: <GamePadIcon />,
    image: 'game-development'
  },
  {
    categories: ['Music Theory', 'Audio Mixing & Mastering', 'Sound Design'],
    icon: <SpeakerIcon />,
    image: 'music-production'
  },
  {
    categories: ['Machine Learning', 'Prompt Engineering', 'Robotics'],
    icon: <RobotIcon />,
    image: 'machine-learning'
  },
  {
    categories: ['Video Editing', 'Visual Effects', 'Cinematography'],
    icon: <PhotoAndVideoIcon />,
    image: 'video-editing'
  },
  {
    categories: ['Mathematics', 'Physics', 'Geometry', 'Statistics'],
    icon: <MathIcon />,
    image: 'mathematics'
  },
  {
    categories: ['Photography'],
    icon: <CameraIcon />,
    image: 'photography'
  }
]

const defaultValues = {
  categories: undefined,
  icon: <CodeIcon />,
  image: ''
}

export const getCategoryValues = (category: Category) => {
  const { categories: _, ...values } =
    categoryValues.find(c => c.categories.includes(category)) ?? defaultValues

  return values
}
