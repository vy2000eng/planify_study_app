import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { SaveIcon, CancelIcon, DeleteIcon } from "../../assets/svgs";
import COLORS from "../constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../components/DropDown";
import axios from "axios";
import {
  REACT_APP_CREATE_TASK,
  REACT_APP_DELETE,
  REACT_APP_UPDATE,
  REACT_APP_GET_TASKS,
} from "@env";
import { AuthContext } from "../context/AuthContext";

export const AddActivity = ({ navigation, route }) => {
  const { fromOnLongClick, mTitle, mDescription, mDate, mPriority, mId } =
    route.params;

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null);
  const { valuesForChildren } = useContext(AuthContext);
  const { retrieveToken, state, dispatch, setReloadTasks, reloadTasks } =
    valuesForChildren;
  const { tasks } = state;

  console.log(valuesForChildren);
  ///const { count, is_updated } = stateTask;

  useEffect(() => {
    const setExistingValues = () => {
      setDate(new Date(mDate));
      setTitle(mTitle);
      setDescription(mDescription);
      setDropdownValue(mPriority);
    };

    if (fromOnLongClick) {
      setExistingValues();
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setDate(currentDate);
  };

  const handleSave = useCallback(async () => {
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
      const url = REACT_APP_CREATE_TASK;
      await axios
        .post(url, data, config)
        .then(setReloadTasks(!reloadTasks))
        .then(navigation.navigate("MainActivity"));

      dispatch({
        type: "SET_FILTERED",
        action: false,
      });
      const filtered_tasks = editted_task_list.filter((task) => {
        return task.completed === false;
      });
      dispatch({
        type: "SET_TRUE_TASKS",
        payload: filtered_tasks,
      });

      //const tasks_response = await axios.get(REACT_APP_GET_TASKS, config);
      //dispatch({ type: "SET_TASKS", payload: tasks_response.data });
      // setReloadTasks(!reloadTasks);
      // navigation.navigate("MainActivity");
    } catch (e) {
      console.log(e);
    }
  }, [title, description, date, dropdownValue, reloadTasks, setReloadTasks]);

  const handleUpdate = async () => {
    console.log("its the update button thats being called");
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
      const url = REACT_APP_UPDATE + `${mId}`;
      await axios.put(url, data, config);
      const editted_tasks = tasks.map((task) => {
        if (task.id === mId) {
          return {
            ...task,
            title: title,
            description: description,
            due_date: date,
            priority: dropdownValue,
          };
        }
        return task;
      });

      dispatch({
        type: "SET_TASKS",
        payload: editted_tasks,
      });
      setReloadTasks(!reloadTasks);

      // dispatchTask({
      //   type: "UPDATE_TASK",
      //   payload: !is_updated,
      // });

      navigation.navigate("MainActivity");
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("MainActivity");
  };

  const handleDelete = async () => {
    console.log("its the delete button thats being called");
    try {
      const token = await retrieveToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = REACT_APP_DELETE + `${mId}`;
      await axios.delete(url, config);
      //console.log(tasks);
      tasks = tasks.filter((task) => task.id !== mId);
      dispatch({
        type: "DELETE_TASK",
        payload: tasks,
      });

      // dispatchTask({
      //   type: "DELETE_TASK",
      //   payload: count - 1,
      // });
      navigation.navigate("MainActivity");
    } catch (e) {
      console.log(e.response);
    }

    navigation.navigate("MainActivity");
  };

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
          {fromOnLongClick ? (
            <>
              <SaveIcon
                onPress={handleUpdate}
                height={32}
                width={32}
                color="black"
              />
              <DeleteIcon
                onPress={handleDelete}
                height={32}
                width={32}
                color="black"
              />
            </>
          ) : (
            <>
              <SaveIcon
                onPress={handleSave}
                height={32}
                width={32}
                color="black"
              />
              <CancelIcon
                onPress={() => navigation.navigate("MainActivity")}
                height={32}
                width={32}
                color="black"
              />
            </>
          )}
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
