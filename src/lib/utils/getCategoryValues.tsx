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
} from '@/components/icons'
import type { Category } from '@/types.d'

type CategoryValues = {
  categories: Category[]
  icon: React.ReactNode
}

const categoryValues: CategoryValues[] = [
  {
    categories: ['2D Animation', 'Graphic Design', 'Logo & Branding Design', 'UI/UX Design'],
    icon: <PaletteIcon />
  },
  {
    categories: ['3D Animation', '3D Modeling'],
    icon: <CubeIcon />
  },
  {
    categories: ['Backend Development', 'Data Science', 'Databases', 'Programming'],
    icon: <CodeIcon />
  },
  {
    categories: ['Web Development', 'Software Development'],
    icon: <ComputerCodeIcon />
  },
  {
    categories: ['Mobile App Development'],
    icon: <MobileCodeIcon />
  },
  {
    categories: ['Game Development'],
    icon: <GamePadIcon />
  },
  {
    categories: ['Music Theory', 'Audio Mixing & Mastering', 'Sound Design'],
    icon: <SpeakerIcon />
  },
  {
    categories: ['Machine Learning', 'Prompt Engineering', 'Robotics'],
    icon: <RobotIcon />
  },
  {
    categories: ['Video Editing', 'Visual Effects', 'Cinematography'],
    icon: <PhotoAndVideoIcon />
  },
  {
    categories: ['Mathematics', 'Physics', 'Geometry', 'Statistics'],
    icon: <MathIcon />
  },
  {
    categories: ['Photography'],
    icon: <CameraIcon />
  }
]

const defaultValues = {
  categories: undefined,
  icon: <CodeIcon />
}

export const getCategoryValues = (category: Category) => {
  const { categories: _, ...values } =
    categoryValues.find(c => c.categories.includes(category)) ?? defaultValues

  return values
}
