import React, { createContext, useContext, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authTokenBoolean, setAuthTokenBoolean] = useState(false);

  const initial_state = {
    count: 0,
    set_is_true: true,
    set_is_false: false,
  };
  const tasksReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return { ...state, count: action.payload };
      case "SET_TRUE_TO_FALSE":
        return { ...state, set_is_true: action.payload };
      case "SET_FALSE_TO_TRUE":
        return { ...state, set_is_true: action.payload };

      default:
        return state;
    }
  };

  const [stateTask, dispatchTask] = useReducer(tasksReducer, initial_state);

  //secure store functions
  const storeToken = async (token) => {
    try {
      await SecureStore.setItemAsync("token", token);
      setAuthTokenBoolean(true);
      console.log("Token stored successfully.");
    } catch (error) {
      console.log("Error storing token:", error);
    }
  };

  const retrieveToken = async () => {
    try {
      return await SecureStore.getItemAsync("token");
      //console.log("Retrieved token:", token);
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  const removeToken = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("Token removed successfully.");
    } catch (error) {
      console.log("Error removing token:", error);
    }
  };

  const valuesForChildren = {
    authTokenBoolean,
    setAuthTokenBoolean,
    storeToken,
    retrieveToken,
    removeToken,
    stateTask,
    dispatchTask,
  };
  return (
    <AuthContext.Provider value={{ valuesForChildren }}>
      {children}
    </AuthContext.Provider>
  );
}
