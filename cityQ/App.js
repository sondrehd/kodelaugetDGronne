

import React, {Component} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StackNavigator } from './app/AppNavigator';
import { store, persistor } from './app/redux/configureStore';
import { setAppState } from './app/redux/actions/appState';
import Main from './app/views/Main';

type Props = {};
export default class App extends Component<Props> {
  async componentDidMount() {
    // store.dispatch(getAppData());
    this.handleAppStateChange(AppState.currentState);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change', //
      this.handleAppStateChange
    );
  }

  handleAppStateChange = (nextAppState: string) => {
    const appState = store.getState().appState;
    // const appData = store.getState().appData;
    // if (
    //   appState.match(/inactive|background/) &&
    //   nextAppState === 'active' &&
    //   !appData.loading
    // ) {
    //   store.dispatch(getAppData());
    // }
    store.dispatch(setAppState(nextAppState));
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <StackNavigator/>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});
