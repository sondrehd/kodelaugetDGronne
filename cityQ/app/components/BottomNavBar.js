import React, { component } from "react";
import { View } from "react-native";

import colors from "../style/colors";

import UserAccount from "../icons/UserAccount";
import CityQNoText from "../icons/CityQNoText";
import Gps from "../icons/Gps";

const BottomNavBar = props => {
  return (
    <View style={styles.Container}>
      <View style={{ ...styles.Cell, flexBasis: "25%" }}>
        <Gps />
      </View>
      <View
        style={{
          ...styles.Cell,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: colors.black,
          flexBasis: "50%",
        }}>
        <CityQNoText />
      </View>
      <View style={{ ...styles.Cell, flexBasis: "25%" }}>
        <UserAccount />
      </View>
    </View>
  );
};
export default BottomNavBar;

const styles = {
  Container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.almostBlack,
    flexBasis: 60,
  },
  Cell: {
    justifyContent: "center",
    alignItems: "center",
  },
};
