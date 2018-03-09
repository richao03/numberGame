import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { shape, func } from 'prop-types';
import { deleteFromStorage } from '../util';
import { styles } from './styles/Settings';

const Settings = ({ screenProps, navigation }) => {
  const logOut = () => {
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
          screenProps.setAppState({ user: 'isGuest', onboarding: true });
          deleteFromStorage('uToken');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingButtons}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Account</Text>
          <Text style={styles.btnIcon}> {screenProps.user.email}</Text>
        </View>
      </View>
      <View style={styles.settingButtons}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ChangeEmail')}>
          <Text style={styles.btnText}>Update Email</Text>
          <Image style={styles.btnIcon} source={require('../assets/icons/nextButton.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingButtons}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.btnText}>Update Password</Text>
          <Image style={styles.btnIcon} source={require('../assets/icons/nextButton.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingButtons}>
        <TouchableOpacity style={styles.btn} onPress={() => logOut()}>
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <Text style={styles.verionText}>Version 0.0.1</Text>
      </View>
    </View>
  );
};

Settings.propTypes = {
  screenProps: shape({
    setAppState: func.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default Settings;
