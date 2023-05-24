import React, { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authTokenBoolean, setAuthTokenBoolean] = useState(false);

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
  };
  return (
    <AuthContext.Provider value={{ valuesForChildren }}>
      {children}
    </AuthContext.Provider>
  );
}
