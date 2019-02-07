import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './views/Main';
import Login from './views/Login';

export const StackNavigator = createAppContainer(
  createStackNavigator({
    Login: Login,
    Main: Main
  })
);
