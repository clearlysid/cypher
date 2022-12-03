import { createStitches, defaultThemeMap } from '@stitches/react'

export const { styled } = createStitches({
  themeMap: {
    ...defaultThemeMap,
  },
  theme: {
    colors: {
      text: 'black',
      background: 'white',
      hover: 'rgba(144, 144, 144, .1)',
      border: 'rgba(144, 144, 144, .32)',
      active: 'dodgerblue',
    },
  },
})

export default styled
