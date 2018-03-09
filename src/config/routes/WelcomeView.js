import React from 'react';
import { StackNavigator } from 'react-navigation';
import Welcome from '../../containers/Welcome';
import Login from '../../containers/Login';
import SignUp from '../../containers/SignUp';
import Notification from '../../containers/Notification';
import Wallet from '../../containers/Wallet';
import { MainTabNav } from './MainTabView';

export const WelcomeView = StackNavigator({
  Welcome: { screen: Welcome },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'SignUp'
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      header: null
    }
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      header: null
    }
  },
  Main: { screen: MainTabNav }
});
