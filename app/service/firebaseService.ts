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
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  } else {
    throw new Error('No user is currently signed in');
  }
};

export const addCategories = async (userId: string, categories: string[]): Promise<void> => {
  try {
    const categoriesCollection = collection(FIRESTORE_DB, 'categories');
    for (const category of categories) {
      await addDoc(categoriesCollection, { userId, category });
    }
  } catch (error) {
    console.error('Error adding categories: ', error);
    throw error;
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
    console.error('Error fetching categories: ', error);
    throw error;
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
    console.error('Error updating category: ', error);
    throw error;
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
    console.error('Error deleting category: ', error);
    throw error;
  }
};
