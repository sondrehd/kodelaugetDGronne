// @flow

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import colors from '../style/colors';

function mapStateToProps(state) {
  return {
  };
}

type Props = {
  navigation: Object
};

class Login extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView
        style={
          styles.safeAreaView
          }
      >
        <View style={styles.container}>
          <View>
            <Text style={{color: 'white'}}>logo</Text>
          </View>
          <Text style={{color: 'white'}}>
              CITY Q
          </Text>
          <View>
            <Text style={{color: 'white'}}>INNLOGGING</Text>
          </View>
          <TouchableOpacity
          onPress={() => console.log("logging in with google")}
          >
            <View>
              <Text style={{color: 'white'}}>Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Main')}
          >
            <View>
              <Text style={{color: 'white'}}>facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black
  }
});

export default connect(mapStateToProps)(Login);
