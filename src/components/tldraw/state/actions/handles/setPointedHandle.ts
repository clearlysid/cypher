import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const setPointedHandle: Action = (data, payload) => {
  mutables.pointedHandleId = payload.target
}
