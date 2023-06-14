import ToggleComplete from "../components/ToggleComplete";
import { REACT_APP_GET_TASKS, REACT_APP_GET_COMPLETED_TASKS } from "@env";
import { AddBtn } from "../../assets/svgs/AddBtn";
import Task from "../components/Task";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import COLORS from "../constants/theme";
// const initialState = {
//   isFiltered: false,
//   tasks: [],
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

const MainActivtiy = ({ navigation }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { valuesForChildren } = useContext(AuthContext);
  const { retrieveToken, state, dispatch } = valuesForChildren;
  const { isFiltered, tasks, isTrueTasks } = state;
  let filtered_tasks = [];
  const toggle_filter = () => {
    const newIsFiltered = !isFiltered; // Compute new value of isFiltered

    dispatch({
      type: "SET_FILTERED",
      payload: newIsFiltered,
    });

    let filtered_tasks;
    if (newIsFiltered) {
      filtered_tasks = tasks.filter((task) => task.completed === true);
    } else {
      filtered_tasks = tasks.filter((task) => task.completed === false);
    }

    dispatch({
      type: "SET_TRUE_TASKS",
      payload: filtered_tasks,
    });

    console.log(filtered_tasks);
  };
  // useEffect(() => {
  //   dispatch({
  //     type: "SET_FILTERED",
  //     payload: !isFiltered,
  //   });
  //   if (isFiltered === true) {
  //     filtered_tasks = tasks.filter((task) => {
  //       return task.completed === true;
  //     });
  //   }
  //   dispatch({
  //     type: "SET_TASKS",
  //     payload: filtered_tasks,
  //   });
  //   console.log(filtered_tasks);
  // }, []);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const token = await retrieveToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(REACT_APP_GET_TASKS, config);
        dispatch({ type: "SET_TASKS", payload: response.data });

        filtered_tasks = response.data.filter((task) => {
          return task.completed === false;
        });

        dispatch({
          type: "SET_TRUE_TASKS",
          payload: filtered_tasks,
        });
        console.log(filtered_tasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetch_data();
  }, []);
  // useEffect(() => {
  //   const fetchTokenAndData = async () => {
  //     try {
  //       const token = await retrieveToken();
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       const fetchData = async () => {
  //         try {
  //           const url = isFiltered
  //             ? REACT_APP_GET_COMPLETED_TASKS
  //             : REACT_APP_GET_TASKS;
  //           console.log(url);
  //           const response = await axios.get(url, config);
  //           dispatch({ type: "SET_TASKS", payload: response.data });
  //         } catch (error) {
  //           if (error.response.status === 401) {
  //             //token_setter(false);
  //           }
  //         }
  //       };
  //       await fetchData();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchTokenAndData();
  // }, [isFiltered]);

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
            onPress={() =>
              navigation.navigate("AddActivity", {
                fromOnLongClick: "",
                mTitle: "",
                mDescription: "",
                mDate: "",
                mPriority: "",
                mId: "",
              })
            }
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
  }, [navigation, isFiltered, filtered_tasks]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.sv}>
        {isTrueTasks.map((task) => (
          <Task
            key={task.id} // Make sure to provide a unique key
            id={task.id}
            taskName={task.task_name}
            name={task.name}
            priority={task.priority}
            taskDescription={task.task_description}
            createdAt={task.created_at}
            isCompleted={task.completed}
            due_date={task.due_date}
            style={styles.tasks_container}
            navigation={navigation}
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
