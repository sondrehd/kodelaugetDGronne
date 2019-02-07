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
  
};

class Login extends Component<Props> {
  
  render() {
    return (
      <SafeAreaView
        style={
          styles.safeAreaView
          }
      >
        <View style={styles.container}>
          <Text>
              Login
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
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
