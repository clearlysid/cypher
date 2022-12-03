import { SVGContainer, TLShapeUtil } from '@tldraw/core'
import type { PencilShape } from './PencilShape'
import { getComponentSvgPath } from './pencil-helpers'

export const PencilComponent = TLShapeUtil.Component<PencilShape, SVGSVGElement>(
  ({ shape, events, isGhost, meta }, ref) => {
    // TODO: make this colour customizable
    const color = meta.isDarkMode ? 'white' : 'lightsalmon'
    const pathData = getComponentSvgPath(shape.points)
    return (
      <SVGContainer ref={ref} {...events}>
        <path d={pathData} stroke="transparent" strokeWidth={6} opacity={0} pointerEvents="all" />
        <path d={pathData} fill={color} opacity={isGhost ? 0.3 : 1} />
      </SVGContainer>
    )
  }
)
