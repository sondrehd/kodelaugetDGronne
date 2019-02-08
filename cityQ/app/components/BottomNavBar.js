import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import colors from "../style/colors";

import UserAccount from "../icons/UserAccount";
import CityQNoText from "../icons/CityQNoText";
import Gps from "../icons/Gps";

import { setNavigationMode } from "../redux/actions/UIState";

function mapStateToProps(state) {
  return {
    UIState: state.UIState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setNavigationMode: bool => dispatch(setNavigationMode(bool))
  };
}
class BottomNavBar extends Component<Props> {

  render() {
    return (
      <View style={styles.Container}>
        <View style={{ ...styles.Cell, flexBasis: "25%" }}>
          <Gps fill={this.props.UIState.navigationMode ? 'gray' : 'cyan'} />
        </View>
        <View
          style={{
            ...styles.Cell,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: colors.black,
            flexBasis: "50%",
          }}>
          <CityQNoText fill={this.props.UIState.navigationMode ? 'cyan' : 'gray'} />
        </View>
        <View style={{ ...styles.Cell, flexBasis: "25%" }}>
          <UserAccount fill={'gray'} />
        </View>
      </View>
    );
  };
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
