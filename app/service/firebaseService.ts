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
