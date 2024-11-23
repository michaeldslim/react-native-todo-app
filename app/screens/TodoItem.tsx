import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Todo } from './types';
import { IconButton } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const SWIPE_THRESHOLD = -75;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(50);
  const [contentHeight, setContentHeight] = useState(50);
  const [isSwipeOpen, setIsSwipeOpen] = useState(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    itemHeight.value = height;
    setContentHeight(height);
  }, []);

  const gesture = Gesture.Pan()
    .onChange((event) => {
      // Only allow swipe for completed todos
      if (!todo.completed) {
        translateX.value = 0;
        return;
      }

      if (event.translationX <= 0) {
        // Limit the swipe to SWIPE_THRESHOLD
        translateX.value = Math.max(event.translationX, SWIPE_THRESHOLD);
      } else if (!isSwipeOpen) {
        translateX.value = 0;
      }
    })
    .onEnd(() => {
      // If not completed, ensure it stays in place
      if (!todo.completed) {
        translateX.value = 0;
        return;
      }

      // If swiped more than halfway to threshold, open fully
      if (translateX.value < SWIPE_THRESHOLD / 2) {
        translateX.value = withSpring(SWIPE_THRESHOLD);
        runOnJS(setIsSwipeOpen)(true);
      } else {
        translateX.value = withSpring(0);
        runOnJS(setIsSwipeOpen)(false);
      }
    });

  const handleDelete = () => {
    translateX.value = withSpring(-SCREEN_WIDTH);
    itemHeight.value = withSpring(0);
    setIsSwipeOpen(false);
    confirmDelete(todo.id);
  };

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    // Only show delete container when fully swiped
    const isFullyOpen = translateX.value <= SWIPE_THRESHOLD;
    return {
      opacity: isFullyOpen ? 1 : 0,
      // Hide the container completely when not fully swiped
      transform: [{ translateX: isFullyOpen ? 0 : 100 }],
      pointerEvents: isFullyOpen ? 'auto' : 'none',
      backgroundColor: todo.completed ? '#ff5252' : '#999999',
      height: contentHeight,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
    };
  });

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
    <Animated.View style={[styles.rowContainer, rTaskContainerStyle]}>
      <View style={styles.container}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.swipeableContent, rStyle]}>
            <TouchableOpacity 
              style={[styles.innerContainer, isOlderThan3Days() && styles.oldTodo]}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.todoText,
                  todo.completed ? styles.completed : styles.notCompleted
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {todo.todo}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
        <Animated.View style={[styles.deleteContainer, rIconContainerStyle]}>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <IconButton
              icon="trash-can"
              size={24}
              iconColor={todo.completed ? '#fff' : '#666666'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 2,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  swipeableContent: {
    width: '100%',
  },
  innerContainer: {
    backgroundColor: '#2196f3',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
  },
  todoText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#0f0f0f',
    fontWeight: '300',
  },
  notCompleted: {
    color: '#ffffff',
    fontWeight: '400',
  },
  deleteContainer: {
    width: SWIPE_THRESHOLD * -1,
    height: '100%',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oldTodo: {
    backgroundColor: '#dca470',
  },
});

export default TodoItem;
