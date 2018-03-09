import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { shape, func } from 'prop-types';
import { styles } from './styles/SignupLoginBtn';

const SignupLoginBtn = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.btnText}>Sign up</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.btnText}>Log In</Text>
    </TouchableOpacity>
  </View>
);

SignupLoginBtn.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default SignupLoginBtn;
