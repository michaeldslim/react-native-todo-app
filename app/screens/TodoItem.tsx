import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Todo } from './types';
import { IconButton } from 'react-native-paper';

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  confirmDelete: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  confirmDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
          size={20}
          iconColor={'#ffffff'}
          onPress={onPress}
        />
        <IconButton
          icon={'trash-can'}
          size={20}
          iconColor={'#ff5252'}
          onPress={() => confirmDelete(todo.id)}
          disabled={todo.completed ? false : true}
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
    backgroundColor: '#dca470',
  },
  completed: {
    textDecorationLine: 'line-through',
    alignSelf: 'center',
    color: '#0f0f0f',
    fontSize: 15,
    fontWeight: '300',
    width: '75%',
  },
  notCompleted: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    width: '75%',
  },
  detailButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
