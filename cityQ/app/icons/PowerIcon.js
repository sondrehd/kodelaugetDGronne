import React from 'react'
import Svg, { Defs, Path, G, Use } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PowerIcon = props => (
  <Svg width={24} height={30} {...props}>
    <Defs>
      <Path
        id="prefix__b"
        d="M85.67 41.16l3.105-8.805-8.159-.025a.609.609 0 0 1-.468-1.006l7.173-8.756c1.183-1.422 2.366-2.87 3.574-4.341a.624.624 0 0 1 .863-.098c.197.171.271.441.197.687l-3.13 8.83 8.159.024c.345 0 .616.27.616.613 0 .147-.05.27-.123.368-2.293 2.943-4.708 5.837-7.124 8.756-1.183 1.423-2.366 2.845-3.624 4.366a.624.624 0 0 1-.862.098c-.222-.196-.296-.466-.198-.711"
      />
    </Defs>
    <G fill="none" fillRule="evenodd" transform="translate(-76.667 -15)">
      <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
      <Use fill="#DADBDC" xlinkHref="#prefix__b" />
    </G>
  </Svg>
)

export default PowerIcon
