/*
 Copyright (C) 2025 Michael Lim - Carrot Note App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';

interface NoteActionButtonProps {
  onPress?: () => void;
  styles: StyleProp<ViewStyle>;
  textStyles: StyleProp<ViewStyle>;
  text: string;
}

export const NoteActionButton: React.FC<NoteActionButtonProps> = ({
  onPress,
  styles,
  textStyles,
  text,
}) => (
  <TouchableOpacity style={styles} onPress={onPress}>
    <Text style={textStyles}>{text}</Text>
  </TouchableOpacity>
);
