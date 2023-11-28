// navigation/RootNavigator.js
import React from "react";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { authState } from "../state/authState";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const RootNavigator = () => {
  const { isLoggedIn } = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("userToken");

      if (token) setAuth({ isLoggedIn: true });
    };

    fetchToken();
  }, [setAuth]);

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default RootNavigator;
