import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import COLORS from "../constants/theme";
import { AssignmentIcon } from "../../assets/svgs/AssignmentIcon";
export default function Task(props) {
  const priority_color = [
    COLORS.lowPriority,
    COLORS.mediumPriority,
    COLORS.highPriority,
  ];

  const get_priority_color = () => {
    return props.priority === "1"
      ? priority_color[0]
      : props.priority === "2"
      ? priority_color[1]
      : props.priority === "3"
      ? priority_color[2]
      : null;
  };
  let p_color = get_priority_color();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      elevation: 4,
      padding: 16,
      backgroundColor: p_color,
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
  const true_or_false = () => {
    return props.isCompleted === true ? "true" : "false";
  };
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.text}>
          <Text>Title: {props.taskName}</Text>
          <Text>Description: {props.taskDescription}</Text>
          <Text>Created At: {props.createdAt}</Text>
          <Text>Completed: {true_or_false()} </Text>
          <Text>due_date: {props.due_date} </Text>
        </View>
        <AssignmentIcon height={30} width={30} color="black" />
      </View>
    </Card>
  );
}
