import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { shape, func, string } from 'prop-types';
import t from 'tcomb-form-native';
import { signUpApi } from '../util/kardApi';
import { saveToStorage, encryptFormData } from '../util';
import { emailOption, passwordOption, nameOption, emailValidator, passwordValidator } from '../util/form';
import { styles } from './styles/SignUp';

const Form = t.form.Form;
const nameForm = t.struct({
  firstName: t.String,
  lastName: t.String
});

const emailForm = t.struct({
  email: emailValidator
});

const passwordForm = t.struct({
  password: passwordValidator
});

const nameFormOptions = {
  fields: {
    firstName: nameOption('FIRST NAME', 'e.g. JON'),
    lastName: nameOption('LAST NAME', 'e.g. SNOW')
  }
};

const emailFormOptions = {
  fields: {
    email: emailOption
  }
};

const passwordFormOptions = {
  fields: {
    password: passwordOption
  }
};

const displayText = {
  askName: `Hello, what's your name?`,
  askEmail: `What's your email?`,
  askPassword: `Create a password`
};

class SignUp extends Component {
  state = {
    headerText: '',
    type: {},
    value: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    options: {},
    incompleteForm: true
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

  componentWillMount() {
    this.changeFormView(displayText.askName, nameForm, nameFormOptions);
  }

  changeFormView = (headerText, form, formOption) => {
    const newForm = {
      headerText: headerText,
      type: form,
      options: formOption,
      incompleteForm: true
    };
    this.setState(newForm);
  };

  noValidateForm = () => {
    const value = this.refs.form.validate();
    return value.errors.length;
  };

  toggleButton = (inputValue, addInput = true) =>
    inputValue && addInput ? this.setState({ incompleteForm: false }) : this.setState({ incompleteForm: true });

  onFormInput = value => {
    this.setState({ value }); // <- keep track of value changes
    switch (this.state.headerText) {
      case displayText.askName: {
        this.toggleButton(value.firstName, value.lastName);
        break;
      }
      case displayText.askEmail: {
        this.toggleButton(value.email);
        break;
      }
      case displayText.askPassword: {
        this.toggleButton(value.password);
        break;
      }
    }
  };

  onPress = () => {
    if (this.noValidateForm()) {
      return;
    } else {
      if (this.state.headerText === displayText.askName) {
        this.changeFormView(displayText.askEmail, emailForm, emailFormOptions);
      } else if (this.state.headerText === displayText.askEmail) {
        this.changeFormView(displayText.askPassword, passwordForm, passwordFormOptions);
      } else {
        return this.submitForm();
      }
    }
  };

  submitForm = async () => {
    try {
      const form = this.state.value;
      const formData = encryptFormData(form);
      const response = await signUpApi(formData, this.props.screenProps._csrf);
      const { user } = response.data;
      await saveToStorage('uToken', user.token);
      this.props.screenProps.setAppState({ user: user });
      this.props.navigation.navigate('Notification');
    } catch (error) {
      if (error.response.status == 409) {
        this.displayError(this.state.options, accountError);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.headerText}</Text>
        <Form
          ref="form"
          type={this.state.type}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onFormInput}
        />
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="position" keyboardVerticalOffset={64}>
          <TouchableOpacity style={styles.button} onPress={this.onPress} disabled={this.state.incompleteForm}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default SignUp;
