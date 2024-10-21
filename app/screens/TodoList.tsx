import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  TextStyle,
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
          maxLength={200}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          {newTodo === '' ? (
            <TouchableOpacity
              style={[styles.button, styles.disabledButton]}
              disabled={true}
            >
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddTodo}
            >
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          )}
        </View>
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
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => navigation.navigate('Detail', { todo: item })}
                >
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
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
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
    width: '80%',
  },
  notCompleted: {
    color: 'black',
    fontSize: 16,
    width: '80%',
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
  disabledButton: {
    backgroundColor: '#D8D8D8',
  },
  addButton: {
    backgroundColor: '#2196f3',
  },
  detailButton: {
    backgroundColor: '#2196f3',
    height: 40,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default TodoList;
