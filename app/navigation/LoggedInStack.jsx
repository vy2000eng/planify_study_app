import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainActivtiy from "../pages/MainActivity";
const Stack = createNativeStackNavigator();

const LoggedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainActivity">
      <Stack.Screen
        name="MainActivty"
        component={MainActivtiy}
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInStack;
