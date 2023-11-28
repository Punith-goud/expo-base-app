import React from 'react';
import { View, Button, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { authState } from '../../state/authState';
import { logoutUser } from '../../services/auth/authService';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useEffect } from 'react';

const HomeScreen = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [secureToken, setSecureToken] = useState('');

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      setAuth({ isLoggedIn: false, user: null, token: null });
    }
  };



useEffect(() => {
  const fetchToken = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    setSecureToken(token);
  };

  fetchToken();
}, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Details</Text>
      <Text>ID: {auth.user?.user.id}</Text>
      <Text>Name: {auth.user?.user.name}</Text>
      <Text>Token from recoild: {auth.token}</Text>
      <Text>Token from Secure store: {secureToken}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
