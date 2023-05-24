import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutStack from "./app/navigation/LoggedOutStack";
import LoggedInStack from "./app/navigation/LoggedInStack";
import Navigation from "./app/navigation/Navigation";
import AuthContextProvider from "./app/context/AuthContext";

export default function App() {
  const bool_val = false;
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
