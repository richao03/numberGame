import React from 'react';
import { StackNavigator } from 'react-navigation';

import MyAccount from '../../containers/MyAccount';
import { SettingsView } from './SettingsView';
import { WalletView } from './WalletView';

export const MyAccountView = StackNavigator({
  MyAccountView: {
    screen: MyAccount,
    navigationOptions: {
      title: 'My Account'
    }
  },
  SettingsView: {
    screen: SettingsView,
    navigationOptions: {
      title: 'Settings'
    }
  },
  WalletView: {
    screen: WalletView,
    navigationOptions: {
      header: null
    }
  }
});
