import t from 'tcomb-form-native';
import FormStyleSheet from '../containers/styles/form.style';

export const Form = t.form.Form;

export const formInputField = setting => t.struct(setting);

export const emailValidator = t.refinement(t.String, s => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );
});

export const passwordValidator = t.refinement(t.String, s => {
  if (!s.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)) {
    return false;
  } else {
    return true;
  }
});

export const emailOption = {
  label: 'EMAIL',
  placeholder: 'e.g: abc@gmail.com',
  autoCapitalize: 'none',
  error: 'Insert a valid email',
  required: true
};

export const passwordOption = {
  label: 'PASSWORD',
  type: 'password',
  placeholder: 'Password',
  autoCapitalize: 'none',
  error: 'password must be 8 characters long and contain at least one capitalize letter and one number',
  secureTextEntry: true,
  required: true
};

export const nameOption = (text, eg) => ({
  label: text,
  placeholder: eg,
  autoCapitalize: 'none',
  required: true
});

export const searchCardOption = fn => ({
  type: 'searchCards',
  placeholder: 'Search for cards...',
  onSubmitEditing: fn
});
