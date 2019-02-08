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

import colors from "../style/colors";
import CityQIcon from "../icons/CityQ";
import MyLocation from "../icons/Test";
import Google from "../icons/Google";
import Facebook from "../icons/Facebook";

function mapStateToProps(state) {
  return {};
}

type Props = {
  navigation: Object,
};

class Login extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.Top}>
            <CityQIcon height="150" width="150" fill="white" />
          </View>
          <View style={styles.Bottom}>
            <View>
              <Text style={{ color: "white", fontSize: 25, marginBottom: 20 }}>
                INNLOGGING
              </Text>
            </View>
            <TouchableOpacity
              style={{ ...styles.Button, backgroundColor: colors.googleRed }}
              onPress={() => console.log("logging in with google")}
            >
              <View style={styles.ButtonView}>
                <Google style={styles.ButtonLogo} />
                <Text style={{ color: "white", ...styles.ButtonText }}>
                  Google
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.Button, backgroundColor: colors.facebookBlue }}
              onPress={() => this.props.navigation.navigate("Main")}
            >
              <View style={styles.ButtonView}>
                <Facebook style={styles.ButtonLogo} />
                <Text style={{ color: "white", ...styles.ButtonText }}>
                  Facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
  Top: {
    flexBasis: "32%",
    justifyContent: "flex-end",
  },
  Bottom: {
    flexBasis: "30%",
    width: "100%",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  ButtonText: {
    fontSize: 20,
  },
  ButtonView: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  ButtonLogo: {
    marginRight: 10,
    marginLeft: 10,
  },
  Button: {
    width: "100%",
    height: 60,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.black,
  },
});

export default connect(mapStateToProps)(Login);
