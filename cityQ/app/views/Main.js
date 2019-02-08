// @flow

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";

import colors from "../style/colors";
import BottomNavBar from "../components/BottomNavBar";

function mapStateToProps(state) {
  return {};
}

type Props = {};

class Main extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View
            style={{
              height: "8%",
              width: "100%",
              backgroundColor: colors.black,
              justifyContent: "center",
              paddingLeft: 30,
            }}>
            <Text style={{ color: "white" }}>Søk etter hentested</Text>
          </View>
          <MapView
            style={{ height: "92%", width: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <BottomNavBar />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    marginTop: 80,
    marginBottom: 80,
  },
  headerText: {
    fontFamily: "Avenir",
    fontSize: 20,
  },
  tilesContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tileRow: {
    flexDirection: "row",
  },
  scheduleButtonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 7,
    marginRight: 7,
  },
});

export default connect(mapStateToProps)(Main);
