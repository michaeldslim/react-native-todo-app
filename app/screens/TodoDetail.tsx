import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, { useState } from 'react';
import {
  deleteTodo,
  updateTodo,
  toggleStatus,
} from '../service/firebaseService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackList } from '../navigation/RootNavigator';

type TodoDetailProps = NativeStackScreenProps<RootStackList, 'Detail'>;

const TodoDetail = ({ route, navigation }: TodoDetailProps) => {
  const { todo } = route.params;

  const [editTitle, setEditTitle] = useState<string>(todo.title);

  const handleUpdateTodo = async () => {
    await updateTodo(todo.id, editTitle);
    navigation.goBack();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todo.id);
    navigation.goBack();
  };

  const handleToggleStatus = async () => {
    await toggleStatus(todo.id, !todo.completed);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={editTitle}
          onChangeText={setEditTitle}
          placeholder="Edit Todo Title"
          maxLength={200}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          {editTitle === todo.title ? (
            <TouchableOpacity
              style={[styles.button, styles.disabledButton]}
              disabled={true}
            >
              <Text style={styles.buttonText}>Update Todo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdateTodo}
            >
              <Text style={styles.buttonText}>Update Todo</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteTodo}
          >
            <Text style={styles.buttonText}>Delete Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.toggleButton]}
            onPress={handleToggleStatus}
          >
            <Text style={styles.buttonText}>
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  form: {
    marginVertical: 10,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  updateButton: {
    backgroundColor: '#2196f3',
  },
  disabledButton: {
    backgroundColor: '#D8D8D8',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
  },
});

export default TodoDetail;
