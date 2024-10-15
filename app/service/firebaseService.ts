import { FIRESTORE_DB } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc
} from 'firebase/firestore';
import { ToDo } from '../screens/types';

const todosCollection = collection(FIRESTORE_DB, 'todos');

export const fetchTodos = async () => {
  const snapShot = await getDocs(todosCollection);
  return snapShot.docs.map(doc => ({ id: doc.id , ...doc.data() })) as ToDo[];
};

export const addTodo = async (title: string) => {
  await addDoc(todosCollection, { title, completed: false });
};
