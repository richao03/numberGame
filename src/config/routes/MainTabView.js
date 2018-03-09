import React from 'react';
import { StackNavigator, TabNavigator, navigationOptions } from 'react-navigation';
import { Image } from 'react-native';
import Featured from '../../containers/Featured';
import Search from '../../containers/Search';
import ActivityFeed from '../../containers/ActivityFeed';
import { MyAccountView } from './MyAccountView';
import { SearchView } from './SearchView';
import { FeatureView } from './FeatureView';

const option = {
  tabBarPosition: 'bottom',
  // swipeEnabled: true,
  // animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#32526E'
  }
  
};

export const MainTabNav = TabNavigator(
  {
    Featured: {
      screen: FeatureView,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 26, height: 26, tintColor: tintColor }}
            source={require('../../assets/icons/starIcon.png')}
          />
        )
      }
    },
    Search: {
      screen: SearchView,
      navigationOptions: {
        title: 'Search',
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 26, height: 26, tintColor: tintColor }}
            source={require('../../assets/icons/magnifyingGlassIcon.png')}
          />
        )
      }
    },
    'Activity Feed': {
      screen: ActivityFeed,
      navigationOptions: {
        title: 'Activity Feed',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 26, height: 26, tintColor: tintColor }}
            source={require('../../assets/icons/lightningIcon.png')}
          />
        ),
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#0583DC'
        }
      }
    },
    'My Account': {
      screen: MyAccountView,
      navigationOptions: {
        title: 'My Account',
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 26, height: 26, tintColor: tintColor }}
            source={require('../../assets/icons/myAccountIcon.png')}
          />
        )
      }
    }
  },
  option
);

export const MainTabView = StackNavigator(
  {
    Main: { screen: MainTabNav }
  },
  {
    headerMode: 'screen'
  }
);
