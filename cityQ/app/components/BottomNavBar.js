import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import colors from "../style/colors";

import UserAccount from "../icons/UserAccount";
import CityQNoText from "../icons/CityQNoText";
import Gps from "../icons/Gps";

import { setNavigationMode, setShowLevelMenu, setDrivingMode } from "../redux/actions/UIState";

function mapStateToProps(state) {
  return {
    UIState: state.UIState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setNavigationMode: bool => dispatch(setNavigationMode(bool)),
    setShowLevelMenu: bool => dispatch(setShowLevelMenu(bool)),
    setDrivingMode: bool => dispatch(setDrivingMode(bool))
  };
}
class BottomNavBar extends Component<Props> {
  render() {
    return (
      <View style={styles.Container}>
        <TouchableOpacity style={{ ...styles.Cell, flexBasis: "25%" }}
          onPress={() => {
            this.props.setNavigationMode(false);
            this.props.setShowLevelMenu(false);
            this.props.setDrivingMode(false);
          }}
        >
          <Gps
            fill={
              this.props.UIState.navigationMode &&
                !this.props.UIState.userProfileMode
                ? "gray"
                : "cyan"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.setNavigationMode(true)}
          style={{
            ...styles.Cell,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: colors.black,
            flexBasis: "50%",
          }}>
          {console.log("[sondre]", this.props.UIState.navigationMode)}
          <CityQNoText
            fill={
              this.props.UIState.navigationMode &&
                !this.props.UIState.userProfileMode
                ? "cyan"
                : "gray"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.Cell, flexBasis: "25%" }}>
          <UserAccount fill={"gray"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomNavBar);

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
