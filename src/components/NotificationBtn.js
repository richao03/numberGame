import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { string, func } from 'prop-types';
import { styles } from './styles/NotificationBtn';

const NotificationBtn = props => (
  <View style={styles.buttonContainer}>
    <TouchableHighlight style={styles.button} onPress={props.verifyNotification} underlayColor="#99d9f4">
      <Text style={styles.buttonText}>GET OFFERS</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.buttonRight} onPress={props.switchTextorState} underlayColor="#99d9f4">
      <Text style={styles.buttonRightText}>{props.btnText}</Text>
    </TouchableHighlight>
  </View>
);
NotificationBtn.defaultProps = {
  btnText: ''
};
NotificationBtn.propTypes = {
  verifyNotification: func,
  switchTextorState: func,
  btnText: string
};

export default NotificationBtn;
