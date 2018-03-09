import React from 'react';
import { StackNavigator } from 'react-navigation';

import ChangePassword from '../../containers/ChangePassword';
import ChangeEmail from '../../containers/ChangeEmail';
import Settings from '../../containers/Settings';
import Welcome from '../../containers/Welcome';

export const SettingsView = StackNavigator(
  {
    Settings: { screen: Settings },
    ChangeEmail: { screen: ChangeEmail },
    ChangePassword: { screen: ChangePassword },
    Welcome: { screen: Welcome }
  },
  {
    headerMode: 'none'
  }
);
