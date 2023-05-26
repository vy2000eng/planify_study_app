import ToggleComplete from "../components/ToggleComplete";
import { REACT_APP_GET_TASKS, REACT_APP_GET_COMPLETED_TASKS } from "@env";
import { AddBtn } from "../../assets/svgs/AddBtn";
import Task from "../components/Task";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import axios from "axios";
import COLORS from "../constants/theme";
const initialState = {
  isFiltered: false,
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTERED":
      return { ...state, isFiltered: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const MainActivtiy = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { valuesForChildren } = useContext(AuthContext);
  const { retrieveToken, stateTask } = valuesForChildren;
  const { isFiltered, tasks } = state;
  const toggle_filter = () => {
    dispatch({
      type: "SET_FILTERED",
      payload: !isFiltered,
    });
  };
  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await retrieveToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const fetchData = async () => {
          try {
            const url = isFiltered
              ? REACT_APP_GET_COMPLETED_TASKS
              : REACT_APP_GET_TASKS;
            console.log(url);
            const response = await axios.get(url, config);
            dispatch({ type: "SET_TASKS", payload: response.data });
          } catch (error) {
            if (error.response.status === 401) {
            }
          }
        };
        await fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    fetchTokenAndData();
  }, [isFiltered, stateTask]);

  useEffect(() => {
    console.log("The State Is " + isFiltered);
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: 6,
            gap: 4,
          }}
        >
          <ToggleComplete isFiltered={isFiltered} onPress={toggle_filter} />
          <AddBtn
            onPress={() => navigation.navigate("AddActivity")}
            height={28}
            width={28}
            color="black"
          />
        </View>
      ),
      headerLeft: () => (
        <View>
          <Text>{!isFiltered ? "uncompleted tasks" : "completed tasks"}</Text>
        </View>
      ),
    });
  }, [navigation, isFiltered]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    // Since getMonth() returns a value between 0-11 we need to add 1 to get the correct month number
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero
    const day = ("0" + date.getDate()).slice(-2); // add leading zero

    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.sv}>
        {tasks.map((task) => (
          <Task
            key={task.id} // Make sure to provide a unique key
            taskName={task.task_name}
            name={task.name}
            priority={task.priority}
            taskDescription={task.task_description}
            isCompleted={task.completed}
            due_date={formatDate(task.due_date)}
            style={styles.tasks_container}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  sv: {
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  tasks_container: {
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MainActivtiy;
