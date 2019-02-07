import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Facebook = props => (
  <Svg width={23} height={23} {...props}>
    <Path
      fill="#FFFFFE"
      fillRule="evenodd"
      d="M7.342 5.25c0-.928.619-1.144 1.056-1.144h2.676V.017L7.388 0c-4.09 0-5.022 3.052-5.022 5.003V7.16H0v4.77h2.386v11.928h4.771V11.93h3.983l-.007-4.769H7.342V5.25z"
    />
  </Svg>
)

export default Facebook;
