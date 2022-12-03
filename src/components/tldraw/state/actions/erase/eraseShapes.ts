import type { TLPointerInfo } from '@tldraw/core'
import { getShapeUtils } from '../../../shapes'
import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const eraseShapes: Action = (data, payload: TLPointerInfo) => {
  const { previousPoint } = mutables

  Object.values(data.page.shapes)
    .filter((shape) => !shape.isGhost)
    .forEach((shape) => {
      if (getShapeUtils(shape).hitTestLineSegment(shape, previousPoint, mutables.currentPoint)) {
        shape.isGhost = true
      }
    })
}
