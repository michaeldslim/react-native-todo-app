import {
  View,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo } from '../service/firebaseService';
import { Todo } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackList } from '../navigation/RootNavigator';
import { useIsFocused } from '@react-navigation/native';

type TodoListProps = NativeStackScreenProps<RootStackList, 'List'>;

const TodoList = ({ navigation }: TodoListProps) => {
  const isFocused = useIsFocused();
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos().then();
  }, [isFocused]);

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
        <Button
          title={'Add todo'}
          onPress={handleAddTodo}
          disabled={newTodo === ''}
        />
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { todo: item })}
            >
              <View style={styles.item}>
                <Text
                  style={
                    item.completed ? styles.completed : styles.notCompleted
                  }
                >
                  {item.title}
                </Text>
                <Button
                  title={'Details'}
                  onPress={() => navigation.navigate('Detail', { todo: item })}
                />
              </View>
            </TouchableOpacity>
          )}
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
    marginTop: 10,
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

export default TodoList;
