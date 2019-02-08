import React from 'react'
import Svg, { Defs, Path, G, Use } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const LockIcon = props => (
  <Svg width={24} height={29} {...props}>
    <Defs>
      <Path
        id="prefix__b"
        d="M43.833 35.667a2.215 2.215 0 0 0 2.209-2.209 2.215 2.215 0 0 0-2.209-2.208 2.215 2.215 0 0 0-2.208 2.208c0 1.215.994 2.209 2.208 2.209zm6.625-9.938h-1.104v-2.208A5.523 5.523 0 0 0 43.834 18a5.523 5.523 0 0 0-5.521 5.52h2.097a3.426 3.426 0 0 1 3.423-3.422 3.426 3.426 0 0 1 3.423 3.423v2.208H37.208A2.215 2.215 0 0 0 35 27.938v11.041c0 1.215.994 2.209 2.208 2.209h13.25a2.215 2.215 0 0 0 2.209-2.209V27.938a2.215 2.215 0 0 0-2.209-2.209zm0 13.25h-13.25V27.938h13.25v11.041z"
      />
    </Defs>
    <G fill="none" transform="translate(-32 -15)">
      <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
      <Use fill="#DADBDC" xlinkHref="#prefix__b" />
    </G>
  </Svg>
)

export default LockIcon
