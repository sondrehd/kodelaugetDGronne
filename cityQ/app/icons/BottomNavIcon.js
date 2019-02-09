import React from "react";
import Svg, { Path } from "react-native-svg";

const BottomNavIcon = props => (
  <Svg
    width={375}
    height={54}
    viewBox='0 0 360 52'
    preserveAspectRatio='none'
    {...props}>
    <Path
      fill='#0B1015'
      fillRule='evenodd'
      d='M302.07 0c-38.162 0-16.208 42-62.582 42H121C74.627 42 95.58 0 57.418 0H-1v52h361.488V0H302.07z'
    />
  </Svg>
);

export default BottomNavIcon;
