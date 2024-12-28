import { FONTS } from '@/consts'
import { getCategoryValues } from '@/lib/utils/getCategoryValues'
import type { Category as CategoryType } from '@/types.d'

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
