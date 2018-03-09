import axios from 'axios';

export const initApi = () => axios.get(`http://local.getkard.com:3000/mobile/start`);

export const loginApi = (form, xsrf) =>
  axios.post(`http://local.getkard.com:3000/auth/local/login`, form, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf
    }
  });

export const signUpApi = (form, xsrf) =>
  axios.post(`http://local.getkard.com:3000/auth/local/signup`, form, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': xsrf
    }
  });

export const getUserApi = authToken =>
  axios.get(`http://local.getkard.com:3000/users/oauth`, {
    headers: { Authorization: `Bearer ${authToken}` },
    params: { from: 'extension' }
  });

export const updateUserApi = (formObj, xsrf) =>
  axios.put(
    `http://local.getkard.com:3000/users/update`,
    formObj,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': xsrf
      }
    }
  );

export const searchCardApi = (cardName, authToken) =>
  axios.get(`http://local.getkard.com:3000/cards/search?q=${cardName.toString()}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

export const getDealsApi = authToken =>
  axios.get('http://local.getkard.com:3000/offers/fromwebapp', {
    headers: { Authorization: `Bearer ${authToken}` }
  });
