import type { UserStudyplan } from '@/types.d'

type Data = Array<{
  studyplan: UserStudyplan
  current_studyplan_day: { day: number }
}>

export const parseDataToUserStudyplan = (data: Data) => {
  const {
    studyplan: fetchedStudyplan,
    current_studyplan_day: { day }
  } = data[0]

  return { ...fetchedStudyplan, current_day: day }
}
