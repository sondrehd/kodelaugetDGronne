// @flow

import React, { Component } from "react";
import {

    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { mapStyle } from '../style/mapStyle'
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { setRemaining, setDestination } from '../redux/actions/nav'
import colors from "../style/colors";
import BottomNavBar from "../components/BottomNavBar";
import SearchIcon from "../icons/searchIcon";
import SocketIOClient from 'socket.io-client'

function mapStateToProps(state) {
    return {
        appData: state.appData,
        nav: state.nav
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setDestination: (destination) => dispatch(setDestination(destination)),
        setRemaining: (time, distance) => dispatch(setRemaining(time, distance))
    };
}

type Props = {
    appData: Object,
    nav: Object
};

class Main extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.socket = SocketIOClient('https://hawkon.eu:444/');
        this.socket.emit('message', 'Hi server');
        this.socket.on('message', (data) => {
            console.log('Data recieved from server', data);
        });
    }

    render() {
        const origin = { latitude: 59.9229977, longitude: 10.7535 };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyAb5Q4SBx-bfwZZuyep8e5BrEPHzmdICpY';

        return (
            <SafeAreaView
                style={
                    styles.safeAreaView
                }
            >
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', backgroundColor: colors.black, flexDirection: 'row', height: '8%', width: '100%', justifyContent: 'flex-start', paddingLeft: 30 }}>
                        <SearchIcon />
                        <Text style={{ color: 'white' }}>
                            Søk etter hentested
                        </Text>
                    </View>
                    {this.props.appData && this.props.appData.stations &&
                        <MapView
                            ref={c => this.mapView = c}
                            customMapStyle={mapStyle}
                            provider={PROVIDER_GOOGLE}
                            style={{ height: '92%', width: '100%' }}
                            initialRegion={{
                                latitude: 59.9229977,
                                longitude: 10.7535,
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.01,
                            }}
                            showsUserLocation={true}
                        >
                            {this.props.appData.stations.map(station => (
                                <Marker
                                    key={station.title}
                                    coordinate={station.coordinates}
                                    onPress={() => {
                                        console.log("sondre sitt view skal vises her");
                                    }}
                                    title={station.title}
                                // description={station.description}
                                >
                                    <View style={{ height: 40, width: 40, backgroundColor: colors.black, borderRadius: 50, justifyContent: "center", alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 22 }}>
                                            {station.available}
                                        </Text>
                                    </View>
                                </Marker>
                            ))}
                            {this.props.nav.destination &&
                                <MapViewDirections
                                    origin={origin}
                                    destination={this.props.nav.destination}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={3}
                                    strokeColor={colors.black}
                                    optimizeWaypoints={true}
                                    onReady={result => {
                                        this.props.setRemaining(result.duration, result.distance);
                                        console.log(result.distance + " km");
                                        console.log(result.duration + " min");
                                    }}
                                />
                            }
                        </MapView>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
