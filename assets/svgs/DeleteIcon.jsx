import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const DeleteIcon = ({ height, width, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Svg height={height} viewBox="0 -960 960 960" width={width}>
          <Path
            d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
            fill={color}
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};
