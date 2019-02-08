import React from "react";
import Svg, { Path } from "react-native-svg";

const Reservations = props => (
  <Svg width={23} height={25} {...props}>
    <Path
      fill='#FFF'
      d='M7.995 11.431H5.512v2.333h2.483v-2.333zm4.968 0H10.48v2.333h2.484v-2.333zm4.968 0h-2.484v2.333h2.484v-2.333zm2.484-8.167h-1.242V.931h-2.484v2.333H6.753V.931H4.27v2.333H3.028c-1.379 0-2.472 1.05-2.472 2.334L.544 21.93c0 1.283 1.105 2.333 2.484 2.333h17.387c1.366 0 2.484-1.05 2.484-2.333V5.598c0-1.284-1.118-2.334-2.484-2.334zm0 18.667H3.028V9.098h17.387V21.93z'
    />
  </Svg>
);

export default Reservations;
