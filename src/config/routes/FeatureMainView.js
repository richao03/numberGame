import React from 'react';
import { StackNavigator, TabNavigator, navigationOptions, TabBarTop } from 'react-navigation';
import { Image, Text } from 'react-native';
import Featured from '../../containers/Featured';
import MostValuable from '../../containers/MostValuable';
import WebViewNaigator from '../../containers/WebView';

const options = {
  tabBarComponent: props => <TabBarTop {...props} indicatorStyle={(props, { backgroundColor: '#0583DC' })} />,
  tabBarPosition: 'top',
  // swipeEnabled: true,
  // animationEnabled: true,

  tabBarOptions: {
    activeTintColor: '#0583DC',
    inactiveTintColor:"#92A2B0",
    color:"#92A2B0",
    labelStyle: { fontSize: 15, marginBottom: 10 },
    style: { height: 40, backgroundColor: 'white' }
  }
};

export const FeatureMainView = TabNavigator(
  {
    POPULAR: {
      screen: Featured

      // navigationOptions: {
      //   title: 'Featured'
      // }
    },
    'MOST VALUABLE': {
      screen: MostValuable
      // navigationOptions: {
      //   title: 'Featured'
      // }
    }
  },
  options
);
