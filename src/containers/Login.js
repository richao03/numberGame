import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { shape, func, string } from 'prop-types';
import { styles } from './styles/Login';
import t from 'tcomb-form-native';
import { loginApi } from '../util/kardApi';
import { saveToStorage, encryptFormData } from '../util';
import { emailOption, passwordOption, emailValidator, passwordValidator } from '../util/form';

const Form = t.form.Form;
const loginForm = t.struct({
  email: emailValidator,
  password: passwordValidator
});

const options = {
  fields: {
    email: emailOption,
    password: passwordOption
  }
};
//if no state is needed change this to functional component.
class Login extends Component {
  state = {
    value: {
      email: '',
      password: ''
    },
    options: options,
    incompleteForm: true
  };

  static propTypes = {
    screenProps: shape({
      _csrf: string.isRequired,
      setAppState: func.isRequired
    }).isRequired
  };

  onFormChange = value => {
    this.setState({ value }); // <- keep track of value changes
    return value.email && value.password
      ? this.setState({ incompleteForm: false })
      : this.setState({ incompleteForm: true });
  };

  validateForm = () => {
    const value = this.refs.form.validate();
    return value.errors.length === 0;
  };

  userLogin = async () => {
    try {
      const form = this.refs.form.getValue();
      const formData = encryptFormData(form);
      const response = await loginApi(formData, this.props.screenProps._csrf);
      const { user } = response.data;
      saveToStorage('uToken', user.token);
      this.props.screenProps.setAppState({ user: user, onboarding: false });
    } catch (error) {
      //make a function to display error handling msgs
      const { status } = error.response;
      return status === 404 ? console.log('no user') : console.log('invalid credential');
    }
  };

  onPress = () => this.validateForm() && this.userLogin();

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Form ref="form" type={loginForm} options={options} value={this.state.value} onChange={this.onFormChange} />
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="position" keyboardVerticalOffset={64}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
            underlayColor="#99d9f4"
            disabled={this.state.incompleteForm}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;
