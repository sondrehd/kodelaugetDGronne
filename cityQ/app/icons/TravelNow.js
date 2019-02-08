import React from "react";
import Svg, { Defs, Path, G, Use, Ellipse } from "react-native-svg";

const TravelNow = props => (
  <Svg width={33} height={23} {...props}>
    <Defs>
      <Path
        id='prefix__a'
        d='M13.73 23.818l1.784-1.877-5.338-5.633 18.86-.231.032-2.651-18.86.231 5.478-5.766-1.738-1.834-8.535 8.984z'
      />
    </Defs>
    <G fill='none' fillRule='evenodd' transform='rotate(45 23.965 17.794)'>
      <Use
        fill='#FFF'
        transform='rotate(135 17.24 14.938)'
        xlinkHref='#prefix__a'
      />
      <Path
        fill='#FFF'
        d='M13.115 25.572c1.615-1.668 1.615-4.384 0-6.053a4.05 4.05 0 0 0-5.856 0c-1.614 1.669-1.614 4.385 0 6.053a4.05 4.05 0 0 0 5.856 0z'
      />
      <Ellipse
        cx={10.065}
        cy={22.504}
        stroke='#FFF'
        strokeWidth={2.7}
        rx={9.248}
        ry={9.56}
      />
    </G>
  </Svg>
);

export default TravelNow;
