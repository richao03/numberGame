import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { deleteFromStorage } from '../util';
import { styles } from './styles/MyAccount';
import { shape, func, string } from 'prop-types';

export class MyAccount extends Component {
  state = {
    token: '',
    loading: true
  };

  static propTypes = {
    screenProps: shape({
      _csrf: string.isRequired,
      setAppState: func.isRequired
    }).isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  logOut = () => {
    Alert.alert('We Hate to See You Go', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => {
          Alert.alert('Thank you', 'We appreciate you too!');
        }
      },
      {
        text: 'OK',
        onPress: () => {
          this.props.screenProps.setAppState({ user: 'isGuest' });
          deleteFromStorage('uToken');
        }
      }
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.settingButtons}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>NAVIGATOR</Text>
            <Text style={styles.btnIcon}> {this.props.screenProps.user.email}</Text>
          </View>
        </View>
        <View style={styles.settingButtons}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('WalletView', {parentView: 'myaccount'})}>
            <Text style={styles.btnText}>My Wallet</Text>
            <Image style={styles.btnIcon} source={require('../assets/icons/nextButton.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingButtons}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('SettingsView')}>
            <Text style={styles.btnText}>Settings</Text>
            <Image style={styles.btnIcon} source={require('../assets/icons/nextButton.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingButtons}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('SettingsView')}>
            <Text style={styles.btnText}>Refer a Friend</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyAccount;
