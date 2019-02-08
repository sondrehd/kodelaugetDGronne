import React from "react";
import Svg, { Path } from "react-native-svg";

const MiniLock = props => (
  <Svg width={15} height={21} {...props}>
    <Path
      fill='#ACB8C2'
      d='M7.2 16.2c.99 0 1.8-.81 1.8-1.8s-.81-1.8-1.8-1.8-1.8.81-1.8 1.8.81 1.8 1.8 1.8zm5.4-8.1V6.3c0-2.484-2.102-5.4-5.4-5.4-3.298 0-5.4 2.916-5.4 5.4h2.61A2.792 2.792 0 0 1 7.2 3.51 2.792 2.792 0 0 1 9.99 6.3v1.8H1.8C.81 8.1 0 8.91 0 9.9v9c0 .99.81 1.8 1.8 1.8h10.8c.99 0 1.8-.81 1.8-1.8v-9c0-.99-.81-1.8-1.8-1.8zm-.9 9.9h-9v-7.2h9V18z'
    />
  </Svg>
);

export default MiniLock;
