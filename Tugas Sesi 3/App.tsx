/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([
    {
      id: 1,
      title: 'Ngoding',
      isDone: false,
    },
  ]);
  const [editTitle, setEditTitle] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleAdd = () => {
    if (!title) {
      return Alert.alert('Error', 'Please Enter Task');
    }
    const newTask = {
      id: tasks.length + 1,
      title: title,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const startEdit = (id: number, currentTitle: string) => {
    setIsEditing(id);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = (id: number) => {
    if (!editTitle) {
      return Alert.alert('Error', 'Title cannot be empty');
    }
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, title: editTitle} : task,
      ),
    );
    setIsEditing(null);
    setEditTitle('');
  };

  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <View>
      <Text
        style={{
          padding: 10,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Aplikasi To Do List Sederhana by Ahmad Rofiqi
      </Text>

      <View style={{flexDirection: 'row', padding: 10}}>
        <TextInput
          placeholder="Enter your task..."
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <View style={{justifyContent: 'center'}}>
          <Pressable style={styles.button} onPress={handleAdd}>
            <Text style={{color: 'white'}}>Enter</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.tableRow}>
          <Text style={{flex: 1, fontWeight: 'bold', fontSize: 16}}>No</Text>
          <Text style={{flex: 3, fontWeight: 'bold', fontSize: 16}}>Todo</Text>
          <Text style={{flex: 2, fontWeight: 'bold', fontSize: 16}}>
            Status
          </Text>
          <Text style={{flex: 1, fontWeight: 'bold', fontSize: 16}} />
          <Text style={{flex: 1, fontWeight: 'bold', fontSize: 16}} />
        </View>

        {tasks.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={{flex: 1}}>{index + 1}</Text>

            {isEditing === item.id ? (
              <TextInput
                style={{flex: 3, borderBottomWidth: 1, borderColor: '#ddd'}}
                value={editTitle}
                onChangeText={setEditTitle}
              />
            ) : (
              <Text style={{flex: 3}}>{item.title}</Text>
            )}

            <Text style={{flex: 2}}>{item.isDone ? 'Sudah' : 'Belum'}</Text>

            <View>
              {isEditing === item.id ? (
                <Pressable
                  style={styles.buttonSave}
                  onPress={() => handleSaveEdit(item.id)}>
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.buttonEdit}
                  onPress={() => startEdit(item.id, item.title)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
              )}
            </View>

            <View>
              <Pressable
                style={styles.buttonDelete}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 2,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 2,
  },
  buttonSave: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  container: {
    margin: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
});

export default App;
