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

  // const initial_state = {
  //   count: 0,
  //   set_is_true: true,
  //   set_is_false: false,
  //   is_updated: false,
  // };
  ///this is only a temporary solution, later i should make the initial state initState:{tasks:[]} and do updates on that, i think that way i wouldnt have to make so many apoi calls
  // const tasksReducer = (state, action) => {
  //   switch (action.type) {
  //     case "ADD_TASK":
  //       return { ...state, count: action.payload };
  //     case "SET_TRUE_TO_FALSE":
  //       return { ...state, set_is_true: action.payload };
  //     case "SET_FALSE_TO_TRUE":
  //       return { ...state, set_is_false: action.payload };
  //     case "DELETE_TASK":
  //       return { ...state, count: action.payload };
  //     case "UPDATE_TASK":
  //       return { ...state, is_updated: action.payload };

  //     default:
  //       return state;
  //   }
  // };
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SET_FILTERED":
  //       return { ...state, isFiltered: action.payload };
  //     case "SET_TASKS":
  //       return { ...state, tasks: action.payload };
  //     default:
  //       return state;
  //   }
  // };

  //const [stateTask, dispatchTask] = useReducer(tasksReducer, initial_state);

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
    state,
    dispatch,
  };
  return (
    <AuthContext.Provider value={{ valuesForChildren }}>
      {children}
    </AuthContext.Provider>
  );
}
