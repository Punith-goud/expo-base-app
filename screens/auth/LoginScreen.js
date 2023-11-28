import React, { useState } from 'react';
import { View } from 'react-native';
import { Input,Button,Text ,Dialog } from '@rneui/themed';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../state/authState';
import { loginUser } from '../../services/auth/authService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const setAuth = useSetRecoilState(authState);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await loginUser(username, password);
      if (user) {
        setAuth({ isLoggedIn: true, user: user, token: user.token });
        console.log("user",user)
      } else {
        console.log('Login failed');
        setShowDialog(true); 
      }
    } catch (error) {
      console.log(error);
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h2>Login</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        leftIcon={{ type: 'font-awesome', name: 'user' }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        loading={isLoading}
        containerStyle={{ width: '80%' }}
      />
          <Dialog
        isVisible={showDialog}
        title="Login Failed"
        onBackdropPress={() => setShowDialog(false)}
      >
        <Text>Incorrect login details. Please try again.</Text>
        <Button title="Close" onPress={() => setShowDialog(false)} />
      </Dialog>
    </View>
  );
};

export default LoginScreen;
