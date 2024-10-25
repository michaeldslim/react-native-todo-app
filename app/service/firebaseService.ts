import { FIRESTORE_DB } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { Todo } from '../screens/types';

const todosCollection = collection(FIRESTORE_DB, 'todos');

export const fetchTodos = async () => {
  const q = query(
    collection(FIRESTORE_DB, 'todos'),
    orderBy('createdAt', 'desc'),
  );
  const snapShot = await getDocs(q);
  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Todo[];
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
