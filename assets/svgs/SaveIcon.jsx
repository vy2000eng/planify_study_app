import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect, Line } from "react-native-svg";

const SaveIcon = ({ width, height, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Svg height={height} viewBox="0 0 24 24" width={width} fill={color}>
          <Path d="M0 0h24v24H0V0z" fill="none" />
          <Path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};

export default SaveIcon;
