import { EVENTS } from '@consts'
import type { AlertData } from '@types'
import { dispatchEvent } from './dispatchEvent'

export const showAlert = ({
  header = 'Are you sure?',
  message = 'Do you really know what youre doing?',
  acceptButton = {
    onClick: () => {},
    text: "I know what I'm doing"
  },
  rejectButton = {
    onClick: () => {}
  }
}: Partial<AlertData>) => {
  dispatchEvent(EVENTS.ON_SHOW_ALERT, { header, message, acceptButton, rejectButton })
}
