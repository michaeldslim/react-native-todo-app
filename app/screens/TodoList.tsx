import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  TextStyle,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo } from '../service/firebaseService';
import { Todo } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackList } from '../navigation/RootNavigator';
import { useIsFocused } from '@react-navigation/native';

type TodoListProps = NativeStackScreenProps<RootStackList, 'List'>;

const categories = ['Select an option', 'Work', 'Home', 'Shopping', 'Others'];

const allCategories = ['All', ...categories.slice(1)];

const TodoList = ({ navigation }: TodoListProps) => {
  const isFocused = useIsFocused();
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [category, setCategory] = useState<string>('Select an option');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos().then();
  }, [isFocused]);

  useEffect(() => {
    filterTodos();
  }, [todos, selectedCategory]);

  const filterTodos = () => {
    if (selectedCategory === 'All') {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(
        todos.filter((todo) => todo.category === selectedCategory),
      );
    }
  };

  const handleAddTodo = async () => {
    if (todo.trim() && category) {
      const todoItem: Omit<Todo, 'id'> = {
        todo,
        completed: false,
        createdAt: new Date(),
        category,
      };
      await addTodo(todoItem);
      const todos = await fetchTodos();
      setTodos(todos);
      setTodo('');
      setCategory('Select an option');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
          >
            {categories.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
        <View>
          <TextInput
            style={
              category !== 'Select an option'
                ? styles.activeInput
                : styles.inActiveInput
            }
            placeholder={'Add new todo'}
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
            maxLength={200}
            multiline={true}
            editable={category !== 'Select an option'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              todo === '' ? styles.disabledButton : styles.addButton,
            ]}
            disabled={todo === ''}
            onPress={todo !== '' ? handleAddTodo : () => {}}
          >
            <Text style={styles.buttonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          {allCategories.map((category, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.filterButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCategory === category &&
                    styles.filterButtonTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          style={{ padding: 5 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { todoItem: item })}
            >
              <View style={styles.item}>
                <Text
                  style={
                    item.completed ? styles.completed : styles.notCompleted
                  }
                >
                  [{item.category}] {item.todo}
                </Text>
                <View style={styles.detailButtonWrapper}>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() =>
                      navigation.navigate('Detail', { todoItem: item })
                    }
                  >
                    <Text style={styles.buttonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  form: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'column',
  },
  activeInput: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2196f3',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  inActiveInput: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
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
    marginTop: 2,
    marginBottom: 2,
    width: '100%',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
    width: '85%',
  },
  notCompleted: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    width: '85%',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  } as TextStyle,
  disabledButton: {
    backgroundColor: '#d8d8d8',
  },
  addButton: {
    backgroundColor: '#2196f3',
  },
  detailButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButton: {
    backgroundColor: '#2196f3',
    height: 30,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  pickerContainer: {
    marginBottom: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputActiveWrapper: {
    borderColor: '#2196f3',
  },
  inputInActiveWrapper: {
    borderColor: '#cccccc',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 6,
  },
  filterButton: {
    borderRadius: 5,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  filterButtonSelected: {
    backgroundColor: '#0056b3',
  },
  filterButtonTextSelected: {
    color: '#ffd700',
  },
});

export default TodoList;
