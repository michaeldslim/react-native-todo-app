/*
Copyright (C) 2024 Michael Lim - React Native Todo App - This software is free to use, modify, and share under the terms of the GNU General Public License v3.
*/
import { FIRESTORE_DB } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { Todo } from '../screens/types';
import { getAuth, updatePassword } from 'firebase/auth';
import { Alert } from 'react-native';

const todosCollection = collection(FIRESTORE_DB, 'todos');

export const fetchTodos = async (userId: string): Promise<Todo[]> => {
  try {
    const todosRef = collection(FIRESTORE_DB, 'todos');
    const q = query(
      todosRef,
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];

    // Sort by createdAt in descending order (newest first)
    return todos.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  await addDoc(todosCollection, todo);
};

export const updateTodo = async (id: string, todo: string) => {
  const editDoc = doc(FIRESTORE_DB, 'todos', id);
  await updateDoc(editDoc, { todo });
};

export const toggleStatus = async (id: string, completed: boolean) => {
  const editDoc = doc(FIRESTORE_DB, 'todos', id);
  await updateDoc(editDoc, { completed });
};

export const deleteTodo = async (id: string) => {
  const editDoc = doc(FIRESTORE_DB, 'todos', id);
  await deleteDoc(editDoc);
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      // Re-authenticate the user if necessary
      // This may require additional steps, such as using reauthenticateWithCredential
      await updatePassword(user, newPassword);
      Alert.alert('Password updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Updating password: ${error.message}`);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  } else {
    Alert.alert('Error', 'No user is currently signed in');
  }
};

export const addCategories = async (userId: string, categories: string[]): Promise<void> => {
  try {
    const categoriesCollection = collection(FIRESTORE_DB, 'categories');
    for (const category of categories) {
      await addDoc(categoriesCollection, { userId, category });
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Error', `Adding categories: ${error.message}`);
    } else {
      Alert.alert('Error', 'An unknown error occurred');
    }
  }
};

export const fetchCategories = async (userId: string): Promise<string[]> => {
  try {
    const categoriesCollection = collection(FIRESTORE_DB, 'categories');
    const q = query(categoriesCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const categories: string[] = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data().category);
    });
    return categories.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Error', `Fetching categories: ${error.message}`);
    } else {
      Alert.alert('Error', 'An unknown error occurred');
    }
    return [];
  }
};

export const updateCategory = async (userId: string, oldCategory: string, newCategory: string): Promise<void> => {
  try {
    const categoriesCollection = collection(FIRESTORE_DB, 'categories');
    const q = query(
      categoriesCollection,
      where('userId', '==', userId),
      where('category', '==', oldCategory)
    );
    
    const querySnapshot = await getDocs(q);
    const updates: Promise<void>[] = [];
    
    querySnapshot.forEach((doc) => {
      updates.push(updateDoc(doc.ref, { category: newCategory }));
    });
    
    await Promise.all(updates);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Error', `Updating categories: ${error.message}`);
    } else {
      Alert.alert('Error', 'An unknown error occurred');
    }
  }
};

export const deleteCategory = async (userId: string, categoryToDelete: string): Promise<void> => {
  try {
    const categoriesCollection = collection(FIRESTORE_DB, 'categories');
    const q = query(
      categoriesCollection,
      where('userId', '==', userId),
      where('category', '==', categoryToDelete)
    );
    
    const querySnapshot = await getDocs(q);
    const deletePromises: Promise<void>[] = [];
    
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Error', `Deleting categories: ${error.message}`);
    } else {
      Alert.alert('Error', 'An unknown error occurred');
    }
  }
};
