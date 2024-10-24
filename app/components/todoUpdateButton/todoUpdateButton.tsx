import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonStyles {
  button: ViewStyle;
  disabledButton: ViewStyle;
  updateButton: ViewStyle;
  buttonText: TextStyle;
}

interface TodoUpdateButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  styles: ButtonStyles;
  text: string;
}

export const TodoUpdateButton: React.FC<TodoUpdateButtonProps> = ({
  disabled,
  onPress,
  styles,
  text,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled ? styles.disabledButton : styles.updateButton,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
