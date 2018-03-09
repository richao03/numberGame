import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { string, func, shape } from 'prop-types';
import { styles } from './styles/AddCreditCardBtn';

const AddCreditCardBtn = props => (
  <View style={styles.buttonContainer}>
    <TouchableHighlight
      style={styles.button}
      onPress={() => props.navigation.navigate('Wallet')}
      underlayColor="#99d9f4"
    >
      <Text style={styles.buttonText}>{props.btnText}</Text>
    </TouchableHighlight>
  </View>
);

AddCreditCardBtn.defaultProps = {
  btnText: ''
}
AddCreditCardBtn.propTypes = {
  navigation: shape({
    navigate: func
  }).isRequired,
  btnText: string.isRequired
};

export default AddCreditCardBtn;
