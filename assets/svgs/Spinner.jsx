import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { SvgXml, Circle } from "react-native-svg";

const svgCode = `
<svg
  version="1.1"
  id="L3"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 100 100"
  enable-background="new 0 0 0 0"
  xml:space="preserve"
>
  <circle
    fill="none"
    stroke="#fff"
    stroke-width="4"
    cx="50"
    cy="50"
    r="44"
    style="opacity:0.5;"
  />
  <circle
    fill="#fff"
    stroke="#e74c3c"
    stroke-width="3"
    cx="8"
    cy="54"
    r="6"
  >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite"
    />
  </circle>
</svg>
`;

const Spinner = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [rotationValue]);

  const rotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  return (
    <View>
      <SvgXml xml={svgCode} width={400} height={400}>
        <Circle
          fill="#fff"
          stroke="#e74c3c"
          strokeWidth={3}
          cx="8"
          cy="54"
          r="6"
          transform={`rotate(${rotation} ${50} ${50})`}
        />
      </SvgXml>
    </View>
  );
};

export default Spinner;
