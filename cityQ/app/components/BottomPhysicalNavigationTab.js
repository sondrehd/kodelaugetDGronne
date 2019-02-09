import React from "react";
import BottomNavIcon from "../icons/BottomNavIcon";
import { View, Text } from "react-native";
import PowerIcon from "../icons/PowerIcon";

const BottomPhysicalNavigationTab = props => {
  let speed = props.speed.toString() + " km/h";
  let batteryLevel = props.batteryLevel.toString() + "%";
  return (
    <View style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
      <BottomNavIcon
        width='100%'
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      />
      <View style={[styles.ViewGeneric, { left: 10 }]}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}>
          {speed}
        </Text>
      </View>
      <View style={[styles.ViewGeneric, { right: 10 }]}>
        <PowerIcon fill='white' height={15} />
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}>
          {batteryLevel}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  ViewGeneric: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default BottomPhysicalNavigationTab;
