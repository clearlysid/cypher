import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const clearPointedHandle: Action = () => {
  mutables.pointedHandleId = undefined
}
