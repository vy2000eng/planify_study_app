import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainActivtiy from "../pages/MainActivity";
import { AddActivity } from "../pages/AddActivity";

const Stack = createNativeStackNavigator();

const LoggedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainActivity">
      <Stack.Screen
        name="MainActivity"
        component={MainActivtiy}
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivity}
        options={{
          headerShadowVisible: false,
          title: "",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInStack;
