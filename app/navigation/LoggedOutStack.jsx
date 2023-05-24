import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";

const Stack = createNativeStackNavigator();
const LoggedOutStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
};

export default LoggedOutStack;
