import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect, Line } from "react-native-svg";
export default function AssignmentCompleted({ width, height, color, onPress }) {
  //<path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Svg width={width} height={height} viewBox="0 0 24 24">
          <Path d="M0 0h24v24H0V0z" fill="none" />
          <Path
            d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
            fill={color}
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}
