import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { shape, func } from 'prop-types';
import NotificationBtn from './NotificationBtn';
import SignUpLoginBtn from './SignupLoginBtn';
import AddCreditCardBtn from './AddCreditCardBtn';

const displayButtonFor = props => ({
  Notification: <NotificationBtn {...props} />,
  Welcome: <SignUpLoginBtn {...props} />,
  AddCreditCard: <AddCreditCardBtn {...props} />
});

const ButtonFooter = props => displayButtonFor(props)[props.view.routeName];

ButtonFooter.propTypes = {
  navigation: shape({
    navigate: func
  })
};

export default ButtonFooter;
