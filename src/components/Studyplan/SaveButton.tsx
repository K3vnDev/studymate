import { useContext, useState } from 'react'
import { BookmarkIcon, LoadingIcon } from '../icons'
import { StudyplanContext } from '@/lib/context/StudyplanContext'
import { dataFetch } from '@/lib/utils/dataFetch'
import { CONTENT_JSON } from '@/consts'
import { useUserStore } from '@/store/useUserStore'
import { useChatStore } from '@/store/useChatStore'
import { saveChatToDatabase } from '@/lib/utils/saveChatToDatabase'

export const SaveButton = () => {
  const { studyplan, isSaved: studyplanIsSaved, publicId } = useContext(StudyplanContext)
  const [visualSaved, setVisualSaved] = useState(studyplanIsSaved)
  const [isLoading, setIsLoading] = useState(false)
  const modifyStudyplansList = useUserStore(s => s.modifyStudyplansList)
  const setChatStudyplanOriginalId = useChatStore(s => s.setStudyplanOriginalId)

  const handleSave = (isSaving: boolean) => {
    if (!publicId) {
      if (isSaving) {
        // Create a new studyplan and save it
        setIsLoading(true)
        dataFetch<string>({
          url: '/api/user/lists/save',
          options: {
            method: 'POST',
            headers: CONTENT_JSON,
            body: JSON.stringify(studyplan)
          },
          onSuccess: savedId => {
            setVisualSaved(true)
            modifyStudyplansList(savedId, 'saved').add(true)

            if (studyplan.chat_message_id) {
              setChatStudyplanOriginalId(studyplan.chat_message_id, savedId, newMessages =>
                saveChatToDatabase(newMessages)
              )
            }
          },
          onFinish: () => setIsLoading(false)
        })
      }
      return
    }

    // Save or un-save an existing studyplan
    setIsLoading(true)
    dataFetch({
      url: '/api/user/lists/save',
      options: {
        method: 'PATCH',
        headers: CONTENT_JSON,
        body: JSON.stringify({
          id: publicId,
          save: isSaving
        })
      },
      onSuccess: () => {
        setVisualSaved(isSaving)

        if (isSaving) {
          modifyStudyplansList(publicId, 'saved').add(true)
          return
        }
        modifyStudyplansList(publicId, 'saved').remove()
      },
      onFinish: () => setIsLoading(false)
    })
  }

  const handleClick = () => {
    handleSave(!visualSaved)
  }

  const fill = visualSaved ? 'fill-blue-20' : 'fill-none'
  const basicStyle = 'size-9 min-w-9 text-blue-20'

  return (
    <button onClick={handleClick} className='button flex items-center justify-center' disabled={isLoading}>
      {isLoading ? (
        <LoadingIcon className={`${basicStyle} animate-spin stroke-2`} />
      ) : (
        <BookmarkIcon className={`${fill} ${basicStyle} stroke-[1.5px]`} />
      )}
    </button>
  )
}
