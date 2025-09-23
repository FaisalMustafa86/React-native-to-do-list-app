import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";


const App = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () =>{
        if(task.trim().length > 0){
            setTasks([...tasks, task]);
            setTask("");
        }
    
    };
  return (
    <View style={styles.container}>
        <Text style={styles.text}>TO DO LIST</Text>
        <View style={styles.row}>
            
            <TextInput
                style = {styles.input}
                placeholder="Add tasks"
                value={task}
                onChangeText={setTask}
            />
        </View>
        <View style = {styles.button}>
                <Button title="Add" onPress={addTask} />
        </View>
        <View style ={styles.taskBox}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
    </View>

  );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        paddingTop: 30,
    },
    row: {
        flexDirection: 'row',
        gap: 50,
        marginTop: 50,
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 110,
        marginRight: 110,
        marginTop: 10,
        gap: 50,

    },
    input: {
        flex: 1,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 5,
        fontSize: 18,
    },

    taskBox: {
        margin: 20,
        padding: 10,
        backgroundColor: "#222",
        borderRadius: 10,
        flex: 1,
    },
    task: {
        color: 'white',
        fontSize: 18,
        padding: 5,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    }

})