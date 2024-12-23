import type { UserStudyplanAndCurrentDayResponse } from '@/types.d'

type CurrentStudyplanDay = UserStudyplanAndCurrentDayResponse['current_studyplan_day']

export const generateCurrentStudyplanDay = (day: number): CurrentStudyplanDay => {
  const today = new Date()
  const last_updated = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  return { day, last_updated }
}
