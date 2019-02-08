import React, { Component } from "react";
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

class StationModal extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  handleClickOutsideOfModal = () => {
    this.setModalVisible(false);
  };
  render() {
    return (
      <View
        style={{
          ...styles.Container,
          display: this.state.modalVisible ? "flex" : "none",
        }}>
        <TouchableHighlight
          style={styles.Container}
          onPress={this.handleClickOutsideOfModal}>
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
                    Sundtkvartalet
                  </Text>
                  <Text style={{ color: colors.white, fontSize: 15 }}>
                    Parkeringskjelleren
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
                        12
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
                        4
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
export default StationModal;
