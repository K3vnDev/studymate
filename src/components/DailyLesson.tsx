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
    : ['bg-gray-60 border-card-border', 'rotate-180']

  const dailyLessonName = isExtended ? `${name}:` : name

  return (
    <li
      className={`
        px-7 py-5 ${parentColors} border rounded-lg button cursor-pointer 
        flex justify-between gap-5 transition-all overflow-hidden
      `}
      onClick={handleClick}
    >
      <div className='flex flex-col gap-3'>
        <header className={`${FONTS.INTER} text-white font-normal text-base`}>
          {dailyLessonName}
        </header>
        {isExtended && (
          <>
            <span className='text-gray-10 mt-1'>{desc}</span>
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
      </div>
      <div className='flex flex-col justify-between items-end'>
        <ChevronIcon
          className={`size-6 text-gray-10 ${arrowRotation} [transition:transform_.3s_ease]`}
        />
        {isExtended && <span className='text-gray-10/35'>Day {i + 1}</span>}
      </div>
    </li>
  )
}
