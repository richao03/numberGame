import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { styles } from './styles/ChangeEmail';
import t from 'tcomb-form-native';
import { updateUserApi } from '../util/kardApi';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  confirmEmail: t.String
});

const options = {
  fields: {
    email: {
      type: 'email',
      placeholder: 'Email',
      autoCapitalize: 'none'
    },
    confirmEmail: {
      placeholder: 'Confirm Email',
      autoCapitalize: 'none',
      error: 'Insert a valid email'
    }
  }
};

class ChangeEmail extends Component {
  onPress = async () => {
    const value = this.refs.form.getValue();
    try {
      const xsrf = this.props.screenProps._csrf;
      const response = await updateUserApi(value, xsrf);
      console.log(response); //do something
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref="form" type={User} options={options} />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ChangeEmail;
