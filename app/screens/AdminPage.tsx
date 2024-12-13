import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { changePassword, addCategories, fetchCategories, updateCategory, deleteCategory } from '../service/firebaseService';

const AdminPage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editedCategoryText, setEditedCategoryText] = useState<string>('');
  const isFocused = useIsFocused();
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    const loadCategories = async () => {
      if (userId) {
        try {
          const fetchedCategories = await fetchCategories(userId);
          setCategories(fetchedCategories);
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert('Error', `Failed to load categories: ${error.message}`);
          } else {
            Alert.alert('Error', 'An unknown error occurred');
          }
        }
      }
    };
    
    if (isFocused) {
      loadCategories();
    }
  }, [userId, isFocused]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert('Success', 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Failed to change password: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  const handleAddCategory = async () => {
    const newCategories = newCategory.split(',').map(cat => cat.trim());
    if (categories.length + newCategories.length > 7) {
      Alert.alert('Error', 'You cannot add more than 7 categories.');
      return;
    }
    try {
      const user = getAuth().currentUser;
      if (user) {
        await addCategories(user.uid, newCategories);
        Alert.alert('Success', 'Categories added successfully');
      } else {
        Alert.alert('Error', 'User not authenticated');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Failed to add categories: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
    setCategories([...categories, ...newCategories]);
    setNewCategory('');
  };

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditedCategoryText(category);
  };

  const handleUpdateCategory = async (oldCategory: string) => {
    if (editedCategoryText.trim().length < 2) {
      Alert.alert('Error', 'Category must be at least 2 characters long');
      return;
    }

    if (categories.some(cat => 
      cat.toLowerCase() === editedCategoryText.toLowerCase() && 
      cat.toLowerCase() !== oldCategory.toLowerCase()
    )) {
      Alert.alert('Error', 'This category already exists');
      return;
    }

    try {
      const user = getAuth().currentUser;
      if (user) {
        await updateCategory(user.uid, oldCategory, editedCategoryText.trim());
        const updatedCategories = categories.map(cat => 
          cat === oldCategory ? editedCategoryText.trim() : cat
        ).sort((a, b) => a.localeCompare(b));
        setCategories(updatedCategories);
        setEditingCategory(null);
        setEditedCategoryText('');
        Alert.alert('Success', 'Category updated successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Failed to update category: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  const handleDeleteCategory = async (categoryToDelete: string) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${categoryToDelete}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const user = getAuth().currentUser;
              if (user) {
                await deleteCategory(user.uid, categoryToDelete);
                const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
                setCategories(updatedCategories);
                Alert.alert('Success', 'Category deleted successfully');
              }
            } catch (error) {
              if (error instanceof Error) {
                Alert.alert('Error', `Failed to delete category: ${error.message}`);
              } else {
                Alert.alert('Error', 'An unknown error occurred');
              }
            }
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>            
            <View style={styles.section}>
              <Text style={styles.subtitle}>Add New Category</Text>
              <Text style={styles.instructions}>Enter categories separated by commas (e.g., Work, Personal, Shopping)</Text>
              <TextInput
                style={styles.input}
                placeholder="New Categories"
                value={newCategory}
                onChangeText={setNewCategory}
              />
              <TouchableOpacity 
                onPress={handleAddCategory}
                disabled={newCategory.trim().length < 2}
                style={[
                  styles.button,
                  newCategory.trim().length < 2 && styles.buttonDisabled
                ]}
              >
                <Text style={styles.buttonText}>Add Category</Text>
              </TouchableOpacity>
              {categories.length > 0 && (
                <View style={styles.categoriesContainer}>
                  <Text style={styles.sectionTitle}>Categories</Text>
                  {categories.map((category, index) => (
                    <View key={index} style={styles.categoryItem}>
                      {editingCategory === category ? (
                        <View style={styles.editCategoryContainer}>
                          <TextInput
                            style={styles.editCategoryInput}
                            value={editedCategoryText}
                            onChangeText={setEditedCategoryText}
                            placeholder="Edit category"
                          />
                          <TouchableOpacity
                            style={[styles.editButton, { backgroundColor: '#4CAF50' }]}
                            onPress={() => handleUpdateCategory(category)}
                          >
                            <Text style={styles.buttonText}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.editButton, { backgroundColor: '#f44336' }]}
                            onPress={() => setEditingCategory(null)}
                          >
                            <Text style={styles.buttonText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.categoryRow}>
                          <Text style={styles.categoryText}>{category}</Text>
                          <View style={styles.categoryButtons}>
                            <TouchableOpacity
                              style={[styles.editButton, { backgroundColor: '#2196F3' }]}
                              onPress={() => handleEditCategory(category)}
                            >
                              <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.editButton, { backgroundColor: '#f44336' }]}
                              onPress={() => handleDeleteCategory(category)}
                            >
                              <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.subtitle}>Change Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={handleChangePassword}
                disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                style={[
                  styles.button,
                  (!currentPassword || !newPassword || newPassword !== confirmPassword) && styles.buttonDisabled
                ]}
              >
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 5,
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  instructions: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
  },
  editCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editCategoryInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
    paddingHorizontal: 5,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default AdminPage;
