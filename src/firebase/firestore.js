import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase.js';

// ─── Enquiries ───────────────────────────────────────────────

export const submitEnquiry = async (data) => {
  const docRef = await addDoc(collection(db, 'enquiries'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return docRef;
};

export const getEnquiries = async () => {
  const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateEnquiryStatus = async (id, status) => {
  const docRef = doc(db, 'enquiries', id);
  await updateDoc(docRef, { status });
};

// ─── Portfolio / Projects ────────────────────────────────────

export const addProject = async (data) => {
  const docRef = await addDoc(collection(db, 'portfolio'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef;
};

export const getProjects = async () => {
  const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProjectsByCategory = async (category) => {
  const q = query(
    collection(db, 'portfolio'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateProject = async (id, data) => {
  const docRef = doc(db, 'portfolio', id);
  await updateDoc(docRef, data);
};

export const deleteProject = async (id) => {
  const docRef = doc(db, 'portfolio', id);
  await deleteDoc(docRef);
};
