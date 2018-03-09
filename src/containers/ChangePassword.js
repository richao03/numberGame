import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { styles } from './styles/ChangePassword';
import axios from 'axios';
import t from 'tcomb-form-native';
import bcrypt from 'react-native-bcrypt';
import { saveToStorage } from '../util';

const Form = t.form.Form;

const Password = t.refinement(t.String, s => {
  if (!s.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)) {
    return false;
  } else {
    return true;
  }
});

const samePasswords = e => e.newPassword === e.confirmPassword;

const User = t.struct({
  passwordOld: Password,
  passwordNew: Password,
  passwordConfirmation: t.String
});

const options = {
  fields: {
    passwordOld: {
      label: 'Current Password',
      placeholder: 'Current Password',
      autoCapitalize: 'none',
      error: 'Insert a valid email',
      required: true
    },
    passwordNew: {
      label: 'New Password',
      placeholder: 'Password',
      error: 'password must be 8 characters long and contain at least one capitalize letter and one number',
      autoCapitalize: 'none',
      secureTextEntry: true,
      required: true
    },
    passwordConfirmation: {
      label: 'Confirm New Password',
      placeholder: 'Re-type your password',
      error: 'Password Must match',
      autoCapitalize: 'none',
      secureTextEntry: true,
      required: true
    }
  }
};

const encryptFormData = formData => {
  const { passwordOld, passwordConfirmation, passwordNew } = formData;
  const dataToSend = {};
  //remove salt later...
  let salt = '$2a$08$6nuyDWUr0rd3M4hpeMZSw.';
  dataToSend.passwordOld = bcrypt.hashSync(passwordOld, salt);
  dataToSend.passwordNew = bcrypt.hashSync(passwordNew, salt);
  dataToSend.passwordConfirmation = bcrypt.hashSync(passwordConfirmation, salt);
  return dataToSend;
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        passwordOld: '',
        passwordNew: '',
        passwordConfirmation: ''
      },
      options: options,
      _csrf: {},
      incompleteForm: true
    };
  }

  componentDidMount() {
    axios
      .get(`http://local.getkard.com:3000/mobile/start`)
      .then(response => {
        const { res } = response.data;
        this.setState({ csrf: res });
      })
      .catch(err => console.log('err,', err));
  }

  validateForm(form) {
    if (form.passwordNew !== form.passwordConfirmation || form.passwordOld == form.passwordNew) {
      this.setState({
        options: t.update(this.state.options, {
          fields: {
            passwordConfirmation: {
              hasError: { $set: true }
            }
          }
        })
      });
      return false;
    } else {
      return true;
    }
  }

  onPress = () => {
    const value = this.refs.form.validate();
    if (value.errors.length === 0) {
      const form = this.refs.form.getValue();
      this.validateForm(form);
      if (this.validateForm(form)) {
        let secret = encryptFormData(form);
        return axios
          .post(`http://local.getkard.com:3000/passwords/reset`, secret, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-XSRF-TOKEN': this.state.csrf
            }
          })
          .then(response => {
            const { token } = response.data.user;
            saveToStorage('uToken', token);
            this.props.screenProps.setAppState({ user: response.data.user });
          })
          .catch(err => {
            if (err.response.status == 409) {
              this.setState({
                options: t.update(this.state.options, {
                  fields: {
                    email: {
                      hasError: { $set: true },
                      error: { $set: 'An account with this email already exists' }
                    }
                  }
                })
              });
            }
          });
      }
    }
  };

  onFormChange = value => {
    this.setState({ value }); // <- keep track of value changes
    if (value.passwordOld && value.passwordNew && value.passwordConfirmation) {
      this.setState({ incompleteForm: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onFormChange}
        />
        <TouchableOpacity
          disabled={this.state.incompleteForm}
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChangePassword;
