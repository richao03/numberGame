import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { WelcomeView, MainTabView, WalletView } from './src/config/routes';
import LoadingScreen from './src/components/LoadingScreen';
import { initApi, getUserApi } from './src/util/kardApi';
import { getFromStorage, deleteFromStorage } from './src/util';
import Notification from './src/containers/Notification';

class App extends Component {
  state = {
    loading: true,
    onboarding: true,
    user: 'isGuest',
    _csrf: {}
  };

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve));

  setAppState = async response => await this.setStateAsync(response);

  async componentDidMount() {
    try {
      const csrf = await initApi();
      const token = await getFromStorage('uToken');
      await new Promise(resolve => setTimeout(resolve, 500));
      if (token !== null) {
        const response = await getUserApi(token);
        await this.setStateAsync({ user: response.data.user, onboarding: false });
      }
      await this.setStateAsync({ _csrf: csrf.data.res, loading: false });
    } catch (error) {
      deleteFromStorage('uToken');
      //if error need to display error msg.
      console.log(error);
      deleteFromStorage('uToken');
    }
  }

  renderRoot = ComponentToRender => {
    const propsForTheScreen = {
      setAppState: this.setAppState,
      user: this.state.user,
      _csrf: this.state._csrf
    };
    return <ComponentToRender screenProps={propsForTheScreen} />;
  };

  render() {
    const { loading, user, onboarding } = this.state;
    if (loading) {
      return <LoadingScreen Welcome />;
    }
    return user === 'isGuest' || onboarding ? this.renderRoot(WelcomeView) : this.renderRoot(MainTabView);
  }
}

export default App;

