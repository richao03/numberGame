import { AsyncStorage } from 'react-native';
import bcrypt from 'react-native-bcrypt';

export const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.info(`Couldn't Set UserToken Info`);
  }
};

export const getFromStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.info(`Couldn't Get UserToken Info`);
  }
};

export const deleteFromStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.info(`Couldn't Remove UserToken Info`);
  }
};

export const encryptFormData = formData => {
  const newForm = Object.assign({}, formData);
  const salt = '$2a$08$6nuyDWUr0rd3M4hpeMZSw.';
  Object.keys(newForm).filter(key => {
    if (key === 'password' || key === 'passwordConfirmation') {
      newForm[key] = bcrypt.hashSync(newForm[key], salt);
    }
  });
  return newForm;
};

export const truncate = str => (str.length > 28 ? `${str.substring(0, 25)}...` : str);
