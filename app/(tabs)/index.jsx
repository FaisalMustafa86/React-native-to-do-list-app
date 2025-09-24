import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load saved tasks when app starts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (e) {
        console.error("Failed to save tasks", e);
      }
    };
    saveTasks();
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  // Remove task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO DO LIST</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Add task"
          placeholderTextColor="gray"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <View style={styles.taskBox}>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.taskRow}>
              <Text style={styles.task}>{item}</Text>
              <Button title="Remove" onPress={() => removeTask(index)} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginRight: 10,
    paddingVertical: 5,
  },
  taskBox: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  task: {
    color: "white",
    fontSize: 18,
  },
});
