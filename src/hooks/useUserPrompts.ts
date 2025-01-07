import { USER_PROMPTS } from '@/consts'
import { useChatStore } from '@/store/useChatStore'
import { useRouter } from 'next/navigation'
import { useChatMessages } from './useChatMessages'

interface Params {
  redirect?: boolean
}

export const useUserPrompts = (params: Params = { redirect: false }) => {
  const setHighlihtedMessage = useChatStore(s => s.setHighlihtedMessage)
  useChatMessages()
  const router = useRouter()

  const callback = (message: string) => {
    if (params.redirect) router.push('/chat')
    setHighlihtedMessage(message)
  }

  return {
    createStudyplan: () => callback(USER_PROMPTS.GENERATE_STUDYPLAN),
    blank: () => callback('')
  }
}
