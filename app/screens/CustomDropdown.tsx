/*
Copyright (C) 2024 Michael Lim - React Native Todo App - This software is free to use, modify, and share under the terms of the GNU General Public License v3.
*/
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CustomDropdownProps {
  selectedValue: string;
  items: string[];
  onValueChange: (itemValue: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedValue,
  items,
  onValueChange,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [temporaryValue, setTemporaryValue] = useState<string>(selectedValue);

  const handleValueChange = (itemValue: string) => {
    setTemporaryValue(itemValue);
  };

  const confirmSelection = () => {
    onValueChange(temporaryValue);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={temporaryValue}
              onValueChange={(itemValue, itemIndex) =>
                handleValueChange(itemValue)
              }
            >
              {items.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={confirmSelection}
            >
              <Text style={styles.closeButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomDropdown;
