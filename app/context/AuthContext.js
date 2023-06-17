import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();
const initialState = {
  isFiltered: false,
  tasks: [],
  isTrueTasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTERED":
      return { ...state, isFiltered: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "DELETE_TASK":
      return { ...state, tasks: action.payload };
    case "SET_TRUE_TASKS":
      return { ...state, isTrueTasks: action.payload };

    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [authTokenBoolean, setAuthTokenBoolean] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isFiltered } = initialState;
  const [reloadTasks, setReloadTasks] = useState(false);

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
    state,
    dispatch,
    reloadTasks,
    setReloadTasks,
  };
  return (
    <AuthContext.Provider value={{ valuesForChildren }}>
      {children}
    </AuthContext.Provider>
  );
}
