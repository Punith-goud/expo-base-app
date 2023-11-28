
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', {
      email,
      password
    });

    const { token } = response.data;

    await SecureStore.setItemAsync('userToken', token);

    
    return { user: { id: 1, name: email }, token: token };
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


export const logoutUser = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');


    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};