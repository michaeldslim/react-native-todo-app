import { FIRESTORE_DB } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Todo } from '../screens/types';

const todosCollection = collection(FIRESTORE_DB, 'todos');

export const fetchTodos = async () => {
  const snapShot = await getDocs(todosCollection);
  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Todo[];
};

export const addTodo = async (title: string) => {
  await addDoc(todosCollection, {
    title,
    completed: false,
    createdAt: new Date(),
  });
};

export const updateTodo = async (id: string, title: string) => {
  const editDoc = doc(FIRESTORE_DB, 'todos', id);
  await updateDoc(editDoc, { title });
};

export const toggleStatus = async (id: string, completed: boolean) => {
  const editDoc = doc(FIRESTORE_DB, 'todos', id);
  await updateDoc(editDoc, { completed });
};

export const deleteTodo = async (id: string) => {
  const editDoc = doc(FIRESTORE_DB, id);
  await deleteDoc(editDoc);
};
