import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Todo } from './types';
import { IconButton } from 'react-native-paper';

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onPress }) => {
  const isOlderThan3Days = () => {
    try {
      const now = new Date();
      const createdDate = new Date(todo.createdAt);
      const daysDifference =
        (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
      return daysDifference > 3;
    } catch (error) {
      console.error('Error checking date', error);
      return false;
    }
  };

  return (
    <View style={[styles.container, isOlderThan3Days() && styles.oldTodo]}>
      <Text style={todo.completed ? styles.completed : styles.notCompleted}>
        {todo.todo}
      </Text>
      <View style={styles.detailButtonWrapper}>
        <IconButton
          icon={'pencil'}
          size={25}
          iconColor={'#ffffff'}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2196f3',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 16,
    marginBottom: 6,
    width: '100%',
  },
  oldTodo: {
    backgroundColor: '#ff8d9e',
  },
  completed: {
    textDecorationLine: 'line-through',
    alignSelf: 'center',
    color: '#b5b5b5',
    fontSize: 16,
    fontWeight: '400',
    width: '90%',
  },
  notCompleted: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    width: '90%',
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
});

export default TodoItem;
