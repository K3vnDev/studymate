import { USER_PROMPTS } from '@/consts'
import { useChatStore } from '@/store/useChatStore'
import { useRouter } from 'next/navigation'

export const useUserPrompts = ({ redirect = false }) => {
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  const router = useRouter()

  const callback = (message: string) => {
    if (redirect) router.push('/chat')
    setHighlihtedMessage(message)
  }

  return {
    createStudyplan: () => callback(USER_PROMPTS.GENERATE_STUDYPLAN),
    blank: () => callback('')
  }
}
