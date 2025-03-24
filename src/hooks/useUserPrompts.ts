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

  const { CREATE_STUDYPLAN, EXPLAIN_TASKS, WHAT_CAN_YOU_DO, WHATS_NEXT } = USER_PROMPTS

  const prompt = (message: string) => {
    if (params.redirect) router.push('/chat')
    setHighlihtedMessage(message)
  }

  return {
    createStudyplan: () => prompt(CREATE_STUDYPLAN),
    explainTasks: () => prompt(EXPLAIN_TASKS),
    whatCanYouDo: () => prompt(WHAT_CAN_YOU_DO),
    whatsNext: () => prompt(WHATS_NEXT),
    blank: () => prompt('')
  }
}
