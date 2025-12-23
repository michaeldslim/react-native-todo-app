/*
 Copyright (C) 2025 Michael Lim - Carrot Note App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonStyles {
  button: ViewStyle;
  disabledButton: ViewStyle;
  updateButton: ViewStyle;
  buttonText: TextStyle;
}

interface NoteUpdateButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  styles: ButtonStyles;
  text: string;
}

export const NoteUpdateButton: React.FC<NoteUpdateButtonProps> = ({
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
