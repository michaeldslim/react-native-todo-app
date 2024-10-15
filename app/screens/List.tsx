import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo } from '../service/firebaseService';
import { ToDo } from './types';

const List = ({ navigation }: any) => {
 const [newTodo, setNewTodo] = useState<string>('');
 const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos().then();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo);
      const todos = await fetchTodos();
      setTodos(todos);
      setNewTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={'Add new todo'}
          onChangeText={(text: string) => setNewTodo(text)}
          value={newTodo}
        />
        <Button title={'Add todo'} onPress={handleAddTodo} disabled={newTodo === ''} />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  form: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff'
  }
});
