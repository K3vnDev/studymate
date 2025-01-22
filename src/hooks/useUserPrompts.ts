import { useChatStore } from '@/store/useChatStore'
import { USER_PROMPTS } from '@consts'
import { useChatMessages } from '@hooks/useChatMessages'
import { useRouter } from 'next/navigation'

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
    explainTasks: () => callback(USER_PROMPTS.EXPLAIN_TASKS),
    blank: () => callback('')
  }
}
