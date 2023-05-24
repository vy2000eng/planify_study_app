import { View, Text } from "react-native";
import React from "react";
import {
  AssignmentIcon,
  AssignmentCompleted,
  CancelIcon,
} from "../../assets/svgs";

export default function ToggleComplete({ isFiltered, onPress }) {
  const Icon = isFiltered ? AssignmentIcon : AssignmentCompleted;
  return <Icon onPress={onPress} height={32} width={32} color="black" />;
}
