// @flow

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { mapStyle } from "../style/mapStyle";
import { connect } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  setStationModalVisible,
  setSelectedStation,
} from "../redux/actions/UIState";
import colors from "../style/colors";
import BottomNavBar from "../components/BottomNavBar";
import StationModal from "../components/StationModal";

function mapStateToProps(state) {
  return {
    appData: state.appData,
    UIState: state.UIState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedStation: id => dispatch(setSelectedStation(id)),
    setModalVisible: value => dispatch(setStationModalVisible(value)),
  };
}
type Props = {
  appData: Object,
};

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
          {this.props.appData && this.props.appData.stations && (
            <MapView
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              style={{ height: "92%", width: "100%" }}
              initialRegion={{
                latitude: 59.9229977,
                longitude: 10.7535,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}>
              {this.props.appData.stations.map(station => (
                <Marker
                  key={station.title}
                  coordinate={station.coordinates}
                  onPress={() => {
                    this.props.setSelectedStation(station.title);
                    this.props.setModalVisible(true);
                  }}
                  title={station.title}
                  // description={station.description}
                >
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: colors.black,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text style={{ color: "white", fontSize: 22 }}>
                      {station.available}
                    </Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
          {this.props.UIState.stationModalVisible && <StationModal />}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.black,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
