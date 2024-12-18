import { CheckIcon, ChevronIcon } from '@/components/icons'
import { FONTS } from '@/consts'
import type { StudyplanSaved } from '@/types.d'

type Props = StudyplanSaved['daily_lessons'][number] & {
  extendedLesson: number
  setExtendedLesson: React.Dispatch<number>
  i: number
}

export const DailyLesson = ({ name, desc, tasks, extendedLesson, setExtendedLesson, i }: Props) => {
  const isExtended = i === extendedLesson

  const handleClick = () => {
    setExtendedLesson(isExtended ? -1 : i)
  }

  const [parentColors, arrowRotation] = isExtended
    ? ['bg-gray-40 border-gray-20', 'rotate-0']
    : ['bg-gray-60 border-gray-40', 'rotate-180']

  const dailyLessonName = isExtended ? `${name}:` : name

  return (
    <li
      className={`
        px-7 py-5 ${parentColors} border-2 rounded-lg button cursor-pointer 
        flex flex-col gap-4 transition-all overflow-hidden
      `}
      onClick={handleClick}
    >
      <header className='flex w-full justify-between items-center'>
        <span className={`${FONTS.INTER} text-white font-normal text-base`}>{dailyLessonName}</span>
        <ChevronIcon
          className={`size-6 text-gray-10 ${arrowRotation} [transition:transform_.3s_ease]`}
        />
      </header>
      {extendedLesson === i && (
        <>
          <span className='text-gray-10'>{desc}</span>
          <ul className='flex flex-col gap-1'>
            {tasks.map(({ goal }, i) => (
              <li key={i} className='text-gray-10 text-base flex gap-2 items-center'>
                <CheckIcon className='size-4' />
                {goal}
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  )
}
