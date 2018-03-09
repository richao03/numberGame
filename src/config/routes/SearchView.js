import React from 'react';
import { StackNavigator } from 'react-navigation';

import Search from '../../containers/Search';
import WebViewNaigator from '../../containers/WebView';
import SearchModal from '../../components/SearchModal';
export const SearchView = StackNavigator({
  SearchView: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#0583DC'
      },
      header: null
    }
  },
  WebView: {
    screen: WebViewNaigator,
    navigationOptions: {
      title: 'Web View',
      header: null
    }
  },
  SearchModal: { screen: SearchModal }
});
