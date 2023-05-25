import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { SaveIcon, CancelIcon } from "../../assets/svgs";
import COLORS from "../constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../components/DropDown";
import axios from "axios";
import { REACT_APP_CREATE_TASK } from "@env";
import { AuthContext } from "../context/AuthContext";

export const AddActivity = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null);
  const { valuesForChildren } = useContext(AuthContext);
  const { retrieveToken } = valuesForChildren;
  console.log(REACT_APP_CREATE_TASK);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    // Since getMonth() returns a value between 0-11 we need to add 1 to get the correct month number
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero
    const day = ("0" + date.getDate()).slice(-2); // add leading zero

    return `${year}-${month}-${day}`;
  };

  const handleSave = useCallback(async () => {
    console.log(title + "\n");
    console.log(description + "\n");
    console.log(date + "\n");
    console.log(dropdownValue);
    const correct_date = formatDate(date);
    console.log(correct_date);

    const fetchToken = async () => {
      const fetchTokenAndData = async () => {
        try {
          const token = await retrieveToken();
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const data = {
            title: title,
            description: description,
            due_date: date,
            priority: dropdownValue,
          };

          const fetchData = async () => {
            try {
              const url = REACT_APP_CREATE_TASK;
              //console.log(url);
              const response = await axios.post(url, data, config);
            } catch (error) {
              if (error.response.status === 401) {
                //token_setter(false);
                console.log(error.response);
              }
            }
          };
          await fetchData();
        } catch (e) {
          console.log(e);
        }
      };
      await fetchTokenAndData();
    };
    await fetchToken();
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
