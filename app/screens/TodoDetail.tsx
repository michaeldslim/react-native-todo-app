import {
  View,
  StyleSheet,
  TextInput,
  TextStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import {
  deleteTodo,
  updateTodo,
  toggleStatus,
} from '../service/firebaseService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackList } from '../navigation/RootNavigator';
import { TodoUpdateButton } from '../components/todoUpdateButton';
import { TodoActionButton } from '../components/todoActionButton';

type TodoDetailProps = NativeStackScreenProps<RootStackList, 'Detail'>;

const TodoDetail = ({ route, navigation }: TodoDetailProps) => {
  const { todoItem } = route.params;

  const [editTodo, setEditTodo] = useState<string>(todoItem.todo);

  const handleUpdateTodo = async () => {
    await updateTodo(todoItem.id, editTodo);
    navigation.goBack();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todoItem.id);
    navigation.goBack();
  };

  const handleToggleStatus = async () => {
    await toggleStatus(todoItem.id, !todoItem.completed);
    navigation.goBack();
  };

  const getStatusText = (completed: boolean) => {
    return completed ? 'Mark as Incomplete' : 'Mark as Complete';
  };

  const isDisabled = editTodo === todoItem.todo;

  const commonButtonStyles = [styles.button, styles.buttonText];

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={editTodo}
          onChangeText={setEditTodo}
          placeholder="Edit Todo Title"
          maxLength={200}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          <TodoUpdateButton
            disabled={isDisabled}
            styles={styles}
            onPress={!isDisabled ? handleUpdateTodo : undefined}
            text="Update Todo"
          />
          <TodoActionButton
            styles={[...commonButtonStyles, styles.deleteButton]}
            onPress={handleDeleteTodo}
            text="Delete Todo"
            textStyles={[styles.buttonText]}
          />
          <TodoActionButton
            styles={[...commonButtonStyles, styles.toggleButton]}
            onPress={handleToggleStatus}
            text={getStatusText(todoItem.completed)}
            textStyles={[styles.buttonText]}
          />
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
    borderColor: '#cccccc',
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
    backgroundColor: '#d8d8d8',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  toggleButton: {
    backgroundColor: '#4caf50',
  },
});

export default TodoDetail;
