import { View, Button, StyleSheet, TextInput, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
  toggleStatus,
} from '../service/firebaseService';
import { Todo } from './types';
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
    await toggleStatus(todo.id, todo.completed);
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
        />
        <Button
          title="Update Todo"
          onPress={handleUpdateTodo}
          disabled={editTitle === todo.title}
        />
        <Button title="Delete Todo" onPress={handleDeleteTodo} />
        <Button
          title={todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          onPress={handleToggleStatus}
        />
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
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  notCompleted: {
    color: 'black',
  },
});

export default TodoDetail;
