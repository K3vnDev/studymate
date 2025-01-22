import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import { FONTS } from '@consts'
import type { Category as CategoryType } from '@types'

interface CategoryProps {
  category: CategoryType
}

export const Category = ({ category }: CategoryProps) => (
  <span
    className={`
      text-gray-10 $${FONTS.INTER} font-medium text-lg 
      flex gap-2 items-center text-nowrap
    `}
  >
    {getCategoryValues(category).icon}
    {category}
  </span>
)
