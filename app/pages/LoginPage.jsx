import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { REACT_APP_LOGIN_URL, REACT_APP_CREATE_USER_URL } from "@env";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [titleOfPage, setTitleOfPage] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { valuesForChildren } = useContext(AuthContext);
  const { storeToken } = valuesForChildren;
  // console.log(valuesForChildren);
  //console.log(storeToken);

  //const

  console.log(REACT_APP_LOGIN_URL);
  const handle_l_r_option = () => {
    titleOfPage.startsWith("L")
      ? setTitleOfPage("Register")
      : setTitleOfPage("Login");
  };

  const handleCreateUser = () => {
    //currently this code is for registration not logging on

    axios

      .post(REACT_APP_CREATE_USER_URL, {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Handle login logic here
  };

  const handleLogin = () => {
    //console.log(process.env.NODE_ENV);

    axios

      .post(REACT_APP_LOGIN_URL, {
        username: email,
        password: password,
      })
      .then((response) => {
        //setAuthToken(response.data.acess_token);
        // authContextValue.storeToken(response.data.access_token);
        console.log(response.data.acess_token);
        storeToken(response.data.acess_token);
      })
      .catch((error) => {
        console.log(error);
      });

    // Handle login logic here
  };
  return (
    <View style={styles.container}>
      <>
        {titleOfPage.startsWith("L") ? (
          <View>
            <Text style={styles.title}>Login</Text>
          </View>
        ) : (
          <Text style={styles.title}>Create An Account</Text>
        )}
      </>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={titleOfPage.startsWith("L") ? handleLogin : handleCreateUser}
        >
          <Text style={styles.text_secondary}>{titleOfPage}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {titleOfPage.startsWith("L")
            ? "Don't Have An Account?"
            : "Already Have An Account?"}
        </Text>
        <Button
          title={titleOfPage.startsWith("L") ? "Register" : "Login"}
          onPress={handle_l_r_option}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 30,
    gap: 10,
  },
  button: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  text_secondary: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginPage;
