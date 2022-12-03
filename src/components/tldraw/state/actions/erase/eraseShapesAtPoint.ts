import { getShapeUtils } from '../../../shapes'
import type { Action } from '../../constants'
import { mutables } from '../../mutables'

export const eraseShapesAtPoint: Action = (data) => {
  const { currentPoint } = mutables

  Object.values(data.page.shapes).forEach((shape) => {
    if (getShapeUtils(shape).hitTestPoint(shape, currentPoint)) {
      delete data.page.shapes[shape.id]
    }
  })

  const { shapes } = data.page
  const { selectedIds, hoveredId } = data.pageState

  // Filter out any deleted shapes
  data.pageState.selectedIds = selectedIds.filter((id) => {
    return shapes[id] !== undefined
  })

  // Remove hovered id if it's been deleted
  if (hoveredId && !shapes[hoveredId]) {
    data.pageState.hoveredId = undefined
  }
}
