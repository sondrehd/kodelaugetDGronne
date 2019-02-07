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

class Main extends Component<Props> {
  
  render() {
    return (
      <SafeAreaView
        style={
          styles.safeAreaView
          }
      >
        <View style={styles.container}>
          <Text>
              hei
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
    backgroundColor: 'white'
  },
  header: {
    marginTop: 80,
    marginBottom: 80
  },
  headerText: {
    fontFamily: 'Avenir',
    fontSize: 20
  },
  tilesContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  tileRow: {
    flexDirection: 'row'
  },
  scheduleButtonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7
  }
});

export default connect(mapStateToProps)(Main);
