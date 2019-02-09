// @flow

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { mapStyle } from "../style/mapStyle";
import { connect } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { setRemaining, setDestination } from "../redux/actions/nav";
import {
  setStationModalVisible,
  setSelectedStation,
  setDrivingMode,
  setShowLevelMenu,
} from "../redux/actions/UIState";
import {
  setAppDataBackend,
  setLevel,
  setLight,
  setLock,
} from "../redux/actions/appData";
import colors from "../style/colors";
import BottomNavBar from "../components/BottomNavBar";
import StationModal from "../components/StationModal";
import SearchIcon from "../icons/searchIcon";
import BottomNavIcon from "../icons/BottomNavIcon";
import SocketIOClient from "socket.io-client";
import LightIcon from "../icons/LightIcon";
import PowerIcon from "../icons/PowerIcon";
import LockIcon from "../icons/LockIcon";
import BottomPhysicalNavigationTab from "../components/BottomPhysicalNavigationTab";

function mapStateToProps(state) {
  return {
    appData: state.appData,
    UIState: state.UIState,
    nav: state.nav,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedStation: id => dispatch(setSelectedStation(id)),
    setModalVisible: value => dispatch(setStationModalVisible(value)),
    setDrivingMode: bool => dispatch(setDrivingMode(bool)),
    setShowLevelMenu: bool => dispatch(setShowLevelMenu(bool)),
    setDestination: destination => dispatch(setDestination(destination)),
    setRemaining: (time, distance) => dispatch(setRemaining(time, distance)),
    setAppDataBackend: (level, battery, speed, lock, light) =>
      dispatch(setAppDataBackend(level, battery, speed, lock, light)),
    setLevel: level => dispatch(setLevel(level)),
    setLight: light => dispatch(setLight(light)),
    setLock: lock => dispatch(setLock(lock)),
  };
}
type Props = {
  appData: Object,
  nav: Object,
};

class Main extends Component<Props> {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.socket = SocketIOClient("https://hawkon.eu:443/");
    this.socket.emit("message", "Hi server");
    this.socket.on("message", data => {
      if (
        typeof data.level !== "undefined" &&
        typeof data.battery !== "undefined" &&
        typeof data.speed !== "undefined" &&
        typeof data.lock !== "undefined" &&
        typeof data.light !== "undefined"
      ) {
        this.props.setAppDataBackend(
          data.level,
          data.battery,
          data.speed,
          data.lock,
          data.light,
        );
      } else if (typeof data.level !== "undefined") {
        this.props.setLevel(data.level);
        setTimeout(() => {
          this.props.setLevel("off");
          setTimeout(() => {
            this.props.setLevel(data.level);
            setTimeout(() => {
              this.props.setLevel("off");
              setTimeout(() => {
                this.props.setLevel(data.level);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      } else if (typeof data.light !== "undefined") {
        this.props.setLight(data.light);
        setTimeout(() => {
          this.props.setLight(!data.light);
          setTimeout(() => {
            this.props.setLight(data.light);
            setTimeout(() => {
              this.props.setLight(!data.light);
              setTimeout(() => {
                this.props.setLight(data.light);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      } else if (typeof data.lock !== "undefined") {
        this.props.setLock(data.lock);
        setTimeout(() => {
          this.props.setLock(!data.lock);
          setTimeout(() => {
            this.props.setLock(data.lock);
            setTimeout(() => {
              this.props.setLock(!data.lock);
              setTimeout(() => {
                this.props.setLock(data.lock);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }
      console.log("Data recieved from server", data);
    });
  }

  render() {
    const origin = { latitude: 59.9229977, longitude: 10.7535 };
    const GOOGLE_MAPS_APIKEY = "AIzaSyAb5Q4SBx-bfwZZuyep8e5BrEPHzmdICpY";

    let arrivalTime = new Date(
      new Date().getTime() + this.props.nav.timeRemaining * 60000,
    );
    let arrivalText = arrivalTime
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5);

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {!this.props.UIState.navigationMode && (
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.black,
                flexDirection: "row",
                height: 40,
                width: "100%",
                justifyContent: "flex-start",
                paddingLeft: 30,
              }}>
              <SearchIcon />
              <Text style={{ color: "white" }}>Søk etter hentested</Text>
            </View>
          )}
          {this.props.UIState.navigationMode && (
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.black,
                flexDirection: "row",
                height: 60,
                width: "100%",
                justifyContent: "space-around",
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLight(!this.props.appData.light);
                  this.socket.emit("message", {
                    light: !this.props.appData.light,
                  });
                }}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flex: 1,
                  alignContent: "center",
                  borderRightWidth: 3,
                  borderColor: "black",
                }}>
                <LightIcon
                  style={{ alignSelf: "center" }}
                  fill={this.props.appData.light ? "yellow" : "lightgray"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setShowLevelMenu(
                    !this.props.UIState.showLevelMenu,
                  );
                }}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flex: 2,
                  alignContent: "center",
                }}>
                <PowerIcon
                  style={{ alignSelf: "center" }}
                  fill={
                    this.props.appData.level === "off"
                      ? "lightgray"
                      : this.props.appData.level === "eco"
                      ? colors.iconGreen
                      : this.props.appData.level === "normal"
                      ? "yellow"
                      : "red"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLock(!this.props.appData.lock);
                  this.socket.emit("message", {
                    lock: !this.props.appData.lock,
                  });
                }}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flex: 1,
                  alignContent: "center",
                  borderLeftWidth: 3,
                  borderColor: "black",
                }}>
                <LockIcon
                  style={{ alignSelf: "center" }}
                  fill={this.props.appData.lock ? "blue" : "lightgray"}
                />
              </TouchableOpacity>
            </View>
          )}
          {this.props.UIState.navigationMode &&
            !this.props.UIState.drivingMode && (
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  zIndex: 5,
                  width: "100%",
                  top: 50,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.setDestination({
                      latitude: 59.934234229977,
                      longitude: 10.7422535,
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: colors.navGreen,
                      height: 30,
                      width: 80,
                      borderRadius: 40,
                      justifyContent: "center",
                    }}>
                    <Text style={{ textAlign: "center", color: "white" }}>
                      HOME
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.setDestination({
                      latitude: 59.984234229977,
                      longitude: 10.7222535,
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: colors.navGreen,
                      height: 30,
                      width: 80,
                      borderRadius: 40,
                      justifyContent: "center",
                    }}>
                    <Text style={{ textAlign: "center", color: "white" }}>
                      WORK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          {this.props.UIState.showLevelMenu && (
            <View
              style={{
                position: "absolute",
                zIndex: 5,
                top: 40,
                width: "100%",
                backgroundColor: colors.black,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLevel("off");
                  this.props.setShowLevelMenu(false);
                  this.socket.emit("message", { level: "off" });
                }}>
                <View
                  style={{
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderTopWidth: 1,
                    borderColor: "lightgray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 70,
                  }}>
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: 23,
                      textAlign: "center",
                    }}>
                    OFF
                  </Text>
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLevel("eco");
                  this.props.setShowLevelMenu(false);
                  this.socket.emit("message", { level: "eco" });
                }}>
                <View
                  style={{
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderTopWidth: 1,
                    borderColor: "lightgray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 70,
                  }}>
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: 23,
                      textAlign: "center",
                    }}>
                    ECO
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.iconGreen,
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLevel("normal");
                  this.props.setShowLevelMenu(false);
                  this.socket.emit("message", { level: "normal" });
                }}>
                <View
                  style={{
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderTopWidth: 1,
                    borderColor: "lightgray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 70,
                  }}>
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: 23,
                      textAlign: "center",
                    }}>
                    NORMAL
                  </Text>
                  <View
                    style={{
                      backgroundColor: "yellow",
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.setLevel("high");
                  this.props.setShowLevelMenu(false);
                  this.socket.emit("message", { level: "high" });
                }}>
                <View
                  style={{
                    alignItems: "center",
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderTopWidth: 1,
                    borderColor: "lightgray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 70,
                  }}>
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: 23,
                      textAlign: "center",
                    }}>
                    HIGH
                  </Text>
                  <View
                    style={{
                      backgroundColor: "red",
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {this.props.appData &&
            this.props.appData.stations &&
            !this.props.UIState.drivingMode && (
              <MapView
                onPress={coords => {
                  console.log(coords);
                  this.props.setDestination(coords.nativeEvent.coordinate);
                }}
                ref={c => (this.mapView = c)}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={{
                  height: Dimensions.get("window").height - 160,
                  width: "100%",
                }}
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
                {this.props.nav.destination &&
                  this.props.UIState.navigationMode && (
                    <MapViewDirections
                      origin={origin}
                      destination={this.props.nav.destination}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor={colors.navGreen}
                      optimizeWaypoints={true}
                      onReady={result => {
                        this.props.setRemaining(
                          result.duration,
                          result.distance * 1000,
                        );
                        console.log(result.distance + " km");
                        console.log(result.duration + " min");
                      }}
                    />
                  )}
              </MapView>
            )}
          {this.props.appData &&
            this.props.appData.stations &&
            this.props.UIState.drivingMode && (
              <Image
                style={{
                  width: "100%",
                  height: Dimensions.get("window").height - 160,
                }}
                source={require("../images/Drive_map.png")}
              />
            )}
          {this.props.UIState.stationModalVisible && <StationModal />}
          {this.props.UIState.navigationMode && (
            <BottomPhysicalNavigationTab
              speed={
                this.props.UIState.drivingMode ? this.props.appData.speed : 0
              }
              batteryLevel={this.props.appData.battery}
            />
          )}
          {this.props.UIState.navigationMode &&
            !this.props.UIState.drivingMode && (
              <TouchableOpacity
                onPress={() => this.props.setDrivingMode(true)}
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  bottom: 55,
                  height: 50,
                  width: 170,
                  backgroundColor: colors.navGreen,
                  borderRadius: 30,
                }}>
                <Text
                  style={{ color: "white", fontSize: 25, textAlign: "center" }}>
                  START
                </Text>
              </TouchableOpacity>
            )}
          {this.props.UIState.navigationMode && this.props.UIState.drivingMode && (
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                justifyContent: "space-around",
                bottom: 55,
                height: 50,
                width: 170,
                backgroundColor: colors.black,
                borderRadius: 30,
              }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  {Math.round(this.props.nav.timeRemaining)}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  min
                </Text>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  {arrivalText}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  arrival
                </Text>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  {this.props.nav.distanceRemaining < 1000
                    ? Math.round(this.props.nav.distanceRemaining)
                    : Math.round(this.props.nav.distanceRemaining / 1000, 2)}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 15, textAlign: "center" }}>
                  {this.props.nav.distanceRemaining < 1000 ? "m" : "km"}
                </Text>
              </View>
            </View>
          )}
          <BottomNavBar />
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
