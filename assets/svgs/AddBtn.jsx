import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Svg, { Path, Rect, Line } from "react-native-svg";

export const AddBtn = ({ width, height, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Svg width={width} height={height} viewBox="0 0 24 24">
          <Rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            ry="2"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line
            x1="15.5"
            y1="12"
            x2="8.5"
            y2="12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line
            x1="12"
            y1="15.5"
            x2="12"
            y2="8.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};
