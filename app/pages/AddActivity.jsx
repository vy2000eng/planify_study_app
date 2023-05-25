import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SaveIcon, CancelIcon } from "../../assets/svgs";
import COLORS from "../constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../components/DropDown";

export const AddActivity = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSave = useCallback(() => {
    console.log(title + "\n");
    console.log(description + "\n");
    console.log(date + "\n");
    console.log(dropdownValue);
  }, [title, description, date, dropdownValue]);

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
  }, [navigation, handleSave]);

  return (
    <View style={styles.container}>
      <View style={styles.text_and_input_container}>
        <View style={styles.row}>
          <Text style={styles.text_container}>Title:</Text>
          <TextInput
            style={styles.text_input}
            placeholder="Please enter Title..."
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text_container}>Description: </Text>
          <TextInput
            style={styles.text_input}
            placeholder="Please enter Description..."
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text_container}>Due Date: </Text>
          <View style={styles.date_picker_container}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text_container}>Priority: </Text>

          <DropdownComponent
            value={dropdownValue}
            setValue={setDropdownValue}
            style={styles.drop_down_picker}
          />

          {/* <DropDownPicker
            open={priorityOpen}
            value={priorityValue}
            items={priorityItems}
            setOpen={setPriorityOpen}
            setValue={setPriorityValue}
            placeholder="Select Priority"
            style={[styles.text_input, { width: 250 }]}
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drop_down_picker: {
    paddingLeft: 5,
    height: 10,
    width: 250,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  text_input: {
    fontSize: 16,
    padding: 5,
    marginBottom: 15,
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  text_and_input_container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 40,
    gap: 50,
  },
  text_container: {
    marginRight: 10,
    width: 100, // Set a fixed width for all labels
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  date_picker_container: {
    flex: 1,
  },
});
