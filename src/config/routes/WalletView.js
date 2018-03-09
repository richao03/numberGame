import React from 'react';
import { StackNavigator } from 'react-navigation';

import Wallet from '../../containers/Wallet.js';

export const WalletView = StackNavigator({
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      header: null
    }
  }
  // AlreadyAdded: { screen: AlreadyAdded}
});
