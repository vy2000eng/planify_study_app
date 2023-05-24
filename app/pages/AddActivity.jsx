import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SaveIcon, CancelIcon } from "../../assets/svgs";
import axios from "axios";

export const AddActivity = ({ navigation }) => {
  const params = {
    height: 28,
    width: 28,
    color: "black",
  };

  const handleSave = () => {};

  useEffect(() => {
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
          <SaveIcon onPress={handleSave} height={32} width={32} color="black" />
          <CancelIcon
            onPress={() => navigation.navigate("MainActivity")}
            height={32}
            width={32}
            color="black"
          />
        </View>
      ),
    });
  }, [navigation]);

  //<Icon onPress={onPress} height={32} width={32} color="black" />;

  return (
    <View>
      <Text>AddActivity</Text>
    </View>
  );
};
