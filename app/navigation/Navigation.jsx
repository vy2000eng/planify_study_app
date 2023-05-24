import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import LoggedInStack from "./LoggedInStack";
import LoggedOutStack from "./LoggedOutStack";
import AuthContextProvider, { AuthContext } from "../context/AuthContext";
const Navigation = () => {
  //const { authTokenBoolean } = useContext(AuthContext);
  const { valuesForChildren } = useContext(AuthContext);
  const { authTokenBoolean } = valuesForChildren;
  //onsole.log(authTokenBoolean);
  // const b_val = true;

  return <>{authTokenBoolean ? <LoggedInStack /> : <LoggedOutStack />}</>;
};

export default Navigation;
