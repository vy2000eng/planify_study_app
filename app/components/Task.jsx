import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import COLORS from "../constants/theme";
import { AssignmentIcon, AssignmentCompleted } from "../../assets/svgs";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { REACT_APP_UPDATE_IS_TRUE } from "@env";
import { AddActivity } from "../pages/AddActivity";
export default function Task(props) {
  const { valuesForChildren } = useContext(AuthContext);
  const { retrieveToken, state, dispatch } = valuesForChildren;
  //const { set_is_true, set_is_false } = stateTask;
  const priority_color = [
    COLORS.lowPriority,
    COLORS.mediumPriority,
    COLORS.highPriority,
  ];
  const params = {
    height: 30,
    color: "black",
    width: 30,
  };

  const get_priority_color = () => {
    return props.priority === "1"
      ? priority_color[0]
      : props.priority === "2"
      ? priority_color[1]
      : props.priority === "3"
      ? priority_color[2]
      : null;
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      elevation: 4,
      padding: 16,
      backgroundColor: get_priority_color(),
      height: 120,
      width: 350,
    },
    contentContainer: {
      flexDirection: "row",
      justifyContent: "space-between", // Align items to the start and end of the container
      alignItems: "center", // Vertically center the content]
    },
    text: {
      marginLeft: 8, // Add spacing between the icon and text
      gap: 6,
    },
  });

  const toggle_true_false = async () => {
    try {
      const token = await retrieveToken();
      //const url =
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        isTrue: !props.isCompleted,
      };
      const url = REACT_APP_UPDATE_IS_TRUE + `${props.id}`;
      await axios.put(url, data, config);
      // props.isCompleted
      //   ? dispatchTask({
      //       type: "SET_TRUE_TO_FALSE",
      //       payload: !set_is_true,
      //     })
      //   : dispatchTask({
      //       type: "SET_FALSE_TO_TRUE",
      //       payload: !set_is_false,
      //     });
    } catch (e) {
      console.log(e);
    }
  };
  const onLongPress = () => {
    props.navigation.navigate("AddActivity", {
      fromOnLongClick: true,
      mTitle: props.taskName,
      mDescription: props.taskDescription,
      mDate: props.due_date,
      mPriority: props.priority,
      mId: props.id,
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    // Since getMonth() returns a value between 0-11 we need to add 1 to get the correct month number
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero
    const day = ("0" + date.getDate()).slice(-2); // add leading zero

    return `${year}-${month}-${day}`;
  };

  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <Card containerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.text}>
            <Text>Title: {props.taskName}</Text>
            <Text>Description: {props.taskDescription}</Text>
            <Text>Created At: {formatDate(props.createdAt)}</Text>
            <Text>Due Date: {formatDate(props.due_date)} </Text>
          </View>
          {props.isCompleted ? (
            <AssignmentCompleted {...params} onPress={toggle_true_false} />
          ) : (
            <AssignmentIcon {...params} onPress={toggle_true_false} />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
