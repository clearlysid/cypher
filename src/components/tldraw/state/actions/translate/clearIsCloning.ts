import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const clearIsCloning: Action = () => {
  mutables.isCloning = false
}
