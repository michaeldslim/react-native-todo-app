import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  TextStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo } from '../service/firebaseService';
import { Todo } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackList } from '../navigation/RootNavigator';
import { useIsFocused } from '@react-navigation/native';
import TodoItem from './TodoItem';
import CustomDropdown from './CustomDropdown';
import { FIREBASE_AUTH } from '../../firebaseConfig';

type TodoListProps = NativeStackScreenProps<RootStackList, 'List'>;

const categories = ['Select an option', 'Home', 'Work', 'Wishlist', 'Others'];
const allCategories = ['All', ...categories.slice(1)];

const TodoList = ({ navigation }: TodoListProps) => {
  const isFocused = useIsFocused();
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [category, setCategory] = useState<string>('Select an option');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const auth = FIREBASE_AUTH;
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const loadTodos = async () => {
      if (userId) {
        const todos = await fetchTodos(userId);
        setTodos(todos);
      }
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

  const getTotalTodosByCategory = (category: string) => {
    if (category === 'All') {
      return todos.length;
    }
    return todos.filter((todo) => todo.category === category).length;
  };

  const handleAddTodo = async () => {
    if (userId && todo.trim() && category) {
      const todoItem: Omit<Todo, 'id'> = {
        todo,
        completed: false,
        createdAt: new Date().toISOString(),
        category,
        userId: userId,
      };
      await addTodo(todoItem);
      const todos = await fetchTodos(userId);
      setTodos(todos);
      setTodo('');
      setCategory('Select an option');
    }
  };

  const confirmDelete = async (todoId: string) => {
    if (!todoId) return;
    if (userId) {
      await deleteTodo(todoId);
      const todos = await fetchTodos(userId);
      setTodos(todos);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          {Platform.OS === 'ios' ? (
            <CustomDropdown
              selectedValue={category}
              items={categories}
              onValueChange={(value) => setCategory(value)}
            />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                }}
              >
                {categories.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
          )}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                todo === '' ? styles.disabledButton : styles.addButton,
              ]}
              disabled={todo.trim() === ''}
              onPress={todo.trim() !== '' ? handleAddTodo : () => {}}
            >
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {allCategories.map((category, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.filterButton,
                    selectedCategory === category &&
                      styles.filterButtonSelected,
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
                    {category} ({getTotalTodosByCategory(category)})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            style={{ padding: 5 }}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onPress={() =>
                  navigation.navigate('Detail', { todoItem: item })
                }
                confirmDelete={confirmDelete}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
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
  buttonContainer: {
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
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  disabledButton: {
    backgroundColor: '#d8d8d8',
  },
  addButton: {
    backgroundColor: '#2196f3',
  },
  pickerContainer: {
    marginBottom: 10,
    borderColor: '#2196f3',
    backgroundColor: '#2196f3',
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
    justifyContent: 'center',
    marginVertical: 6,
  },
  filterButton: {
    borderRadius: 10,
    backgroundColor: '#2196f3',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#0056b3',
  },
  filterButtonTextSelected: {
    color: '#ffd700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#d8d8d8',
    borderRadius: 5,
    marginRight: 5,
  },
  modalButtonDelete: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginLeft: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
});

export default TodoList;
