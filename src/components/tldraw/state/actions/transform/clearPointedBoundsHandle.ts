import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const clearPointedBoundsHandle: Action = (data, payload) => {
  mutables.pointedBoundsHandleId = undefined
}
