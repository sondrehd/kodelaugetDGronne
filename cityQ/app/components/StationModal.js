import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Modal,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import colors from "../style/colors";

import Reservations from "../icons/Reservations";
import TravelNow from "../icons/TravelNow";
import CityQBike from "../icons/CityQBike";
import MiniLock from "../icons/MiniLock";
import { setStationModalVisible } from "../redux/actions/UIState";

function mapStateToProps(state) {
  return {
    UIState: state.UIState,
    appData: state.appData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(setStationModalVisible(false)),
  };
}

type Props = {
  UIState: Object,
  appData: Object,
};

class StationModal extends Component<Props> {
  render() {
    console.log("khjg");
    let station =
      this.props.appData.stations &&
      this.props.appData.stations.find(station => {
        return station.title === this.props.UIState.selectedStationId;
      });
    if (station) {
      console.log("fda");

      return (
        <View
          style={{
            ...styles.Container,
          }}>
          <TouchableHighlight
            style={styles.Container}
            onPress={this.props.close}>
            <TouchableWithoutFeedback>
              <View style={styles.ModalContainer}>
                <View style={styles.Top}>
                  <View
                    style={{
                      flexDirection: "column",
                      flexBasis: "50%",
                      justifyContent: "center",
                    }}>
                    <Text style={{ color: colors.white, fontSize: 20 }}>
                      {station.title}
                    </Text>
                    <Text style={{ color: colors.white, fontSize: 15 }}>
                      {station.subTitle}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexBasis: "50%",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}>
                    <TouchableHighlight
                      onPress={() => console.log("Pressed reservasjon")}>
                      <View style={{ marginRight: 10, ...styles.IconAndText }}>
                        <CityQBike />
                        <Text
                          style={{
                            color: colors.white,
                            padding: 5,
                            fontSize: 20,
                          }}>
                          {station.available}
                        </Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => console.log("Pressed reservasjon")}>
                      <View style={styles.IconAndText}>
                        <MiniLock />
                        <Text
                          style={{
                            color: colors.white,
                            padding: 5,
                            fontSize: 20,
                          }}>
                          {station.freeLocks}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>

                <View style={styles.Middle}>
                  <Text style={styles.Text}>RESERVASJON</Text>
                  <Reservations />
                </View>
                <View style={styles.Bottom}>
                  <Text style={styles.Text}>REIS NÅ</Text>
                  <TravelNow />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  Container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  IconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },

  ModalContainer: {
    flexBasis: Dimensions.get("window").width * 0.9,
    width: "90%",
  },
  Top: {
    flexBasis: "50%",
    backgroundColor: colors.black,
    padding: 20,
  },
  Middle: {
    flexBasis: "25%",
    backgroundColor: colors.blackGreen,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  Text: {
    fontSize: 20,
    color: colors.white,
    flexBasis: "80%",
  },
  Bottom: {
    padding: 20,
    flexBasis: "25%",
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
  },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationModal);
