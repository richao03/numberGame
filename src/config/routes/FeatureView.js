import React from 'react';
import { StackNavigator, TabNavigator, navigationOptions } from 'react-navigation';
import { Image, Text } from 'react-native';
import Featured from '../../containers/Featured';
import MostValuable from '../../containers/MostValuable';
import WebViewNaigator from '../../containers/WebView';
import { FeatureMainView } from './FeatureMainView';

export const FeatureView = StackNavigator({
  featureMain: {
    screen: FeatureMainView,
    navigationOptions: {
      headerMode: 'none',
      title: 'Featured',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#0583DC'
      }
    }
  },
  FeaturedWebView: {
    screen: WebViewNaigator,
    navigationOptions: {
      header: null
    }
  }
});
