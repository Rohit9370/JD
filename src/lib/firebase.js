// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, update as dbUpdate, remove, onChildAdded, onValue, serverTimestamp, get } from 'firebase/database';
import { getStorage, ref as sref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp9T9QI9q90eJBIvF3NackQpOFcSMXuXY",
  authDomain: "syncride-71819.firebaseapp.com",
  databaseURL: "https://syncride-71819-default-rtdb.firebaseio.com",
  projectId: "syncride-71819",
  storageBucket: "syncride-71819.firebasestorage.app",
  messagingSenderId: "2520903417",
  appId: "1:2520903417:web:a660acff5fe72005f7fc28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Admin-only write: create update
export async function createUpdate({ type, title, url, description, file }) {
  let downloadURL = null;
  let filePath = null;
  if (file) {
    const fname = `${Date.now()}-${file.name}`;
    filePath = `updates/${fname}`;
    const fileRef = sref(storage, filePath);
    await uploadBytes(fileRef, file);
    downloadURL = await getDownloadURL(fileRef);
  }
  const updatesRef = ref(db, 'updates');
  const newRef = push(updatesRef);
  await set(newRef, {
    type,
    title,
    url: url || null,
    description: description || null,
    fileURL: downloadURL || null,
    filePath: filePath || null,
    createdAt: serverTimestamp()
  });
}

// Admin-only write: set help info
export async function setHelpInfo({ helpline, hours, email }) {
  await set(ref(db, 'help'), { 
    helpline, 
    hours, 
    email, 
    updatedAt: serverTimestamp() 
  });
}

// Client live updates
export function listenToUpdates(onAdd) {
  return onChildAdded(ref(db, 'updates'), (snap) => {
    if (snap.exists()) {
      onAdd({ id: snap.key, ...snap.val() });
    }
  });
}

export function listenToHelp(onChange) {
  return onValue(ref(db, 'help'), (snap) => {
    if (snap.exists()) {
      onChange(snap.val());
    }
  });
}

// Admin: live list of all updates (sorted newest first)
export function listenToAllUpdates(onChange) {
  return onValue(ref(db, 'updates'), (snap) => {
    const arr = [];
    if (snap.exists()) {
      snap.forEach((child) => arr.push({ id: child.key, ...child.val() }));
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    onChange(arr);
  });
}

// Admin: update existing update by id (optionally replace file)
export async function updateUpdateById(id, { type, title, url, description, file }) {
  const changes = { type, title, url: url || null, description: description || null };
  if (file) {
    const fname = `${Date.now()}-${file.name}`;
    const filePath = `updates/${fname}`;
    const fileRef = sref(storage, filePath);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    changes.fileURL = downloadURL;
    changes.filePath = filePath;
  }
  await dbUpdate(ref(db, `updates/${id}`), changes);
}

// Admin: delete update (and attached file if tracked)
export async function deleteUpdateById(id) {
  try {
    const snap = await get(ref(db, `updates/${id}`));
    if (snap.exists()) {
      const val = snap.val();
      if (val.filePath) {
        try {
          await deleteObject(sref(storage, val.filePath));
        } catch (e) {
          console.warn('Failed to delete file from storage:', e);
        }
      }
    }
  } catch (e) {
    console.warn('Delete prefetch failed:', e);
  }
  await remove(ref(db, `updates/${id}`));
}

// Important Links CRUD
export function listenToImportantLinks(onChange) {
  return onValue(ref(db, 'important_links'), (snap) => {
    const arr = [];
    if (snap.exists()) {
      snap.forEach((child) => arr.push({ id: child.key, ...child.val() }));
      // sort newest first by createdAt if present
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    onChange(arr);
  });
}

export async function createImportantLink({ title, url }) {
  const linksRef = ref(db, 'important_links');
  const newRef = push(linksRef);
  await set(newRef, {
    title,
    url,
    createdAt: serverTimestamp(),
  });
}

export async function updateImportantLinkById(id, { title, url }) {
  await dbUpdate(ref(db, `important_links/${id}`), {
    title,
    url,
  });
}

export async function deleteImportantLinkById(id) {
  await remove(ref(db, `important_links/${id}`));
}

// Simple email/password auth for admin route
export async function signInAdmin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  return signOut(auth);
}

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

// Get all updates (for displaying on main site)
export async function getAllUpdates() {
  return new Promise((resolve) => {
    onValue(ref(db, 'updates'), (snap) => {
      if (snap.exists()) {
        const updates = [];
        snap.forEach((childSnap) => {
          updates.push({ id: childSnap.key, ...childSnap.val() });
        });
        // Sort by createdAt descending
        updates.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        resolve(updates);
      } else {
        resolve([]);
      }
    }, { onlyOnce: true });
  });
}

// Get help info
export async function getHelpInfo() {
  return new Promise((resolve) => {
    onValue(ref(db, 'help'), (snap) => {
      resolve(snap.exists() ? snap.val() : null);
    }, { onlyOnce: true });
  });
}