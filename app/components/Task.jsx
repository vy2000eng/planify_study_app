import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import COLORS from "../constants/theme";
import { AssignmentIcon, AssignmentCompleted } from "../../assets/svgs";
export default function Task(props) {
  const priority_color = [
    COLORS.lowPriority,
    COLORS.mediumPriority,
    COLORS.highPriority,
  ];
  const params = {
    height: 30,
    width: 30,
    color: "black",
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
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.text}>
          <Text>Title: {props.taskName}</Text>
          <Text>Description: {props.taskDescription}</Text>
          <Text>Created At: {props.createdAt}</Text>
          <Text>Due Date: {props.due_date} </Text>
        </View>
        {props.isCompleted ? (
          <AssignmentCompleted {...params} />
        ) : (
          <AssignmentIcon {...params} />
        )}
      </View>
    </Card>
  );
}
