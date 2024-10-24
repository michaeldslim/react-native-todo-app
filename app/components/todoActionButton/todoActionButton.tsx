import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';

interface TodoActionButtonProps {
  onPress?: () => void;
  styles: StyleProp<ViewStyle>;
  textStyles: StyleProp<ViewStyle>;
  text: string;
}

export const TodoActionButton: React.FC<TodoActionButtonProps> = ({
  onPress,
  styles,
  textStyles,
  text,
}) => (
  <TouchableOpacity style={styles} onPress={onPress}>
    <Text style={textStyles}>{text}</Text>
  </TouchableOpacity>
);
