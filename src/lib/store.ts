import { 
  db, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from './firebase';
import type { 
  Milestone, 
  Memory, 
  Song, 
  LoveReason, 
  Letter, 
  OpenWhen, 
  Thing21, 
  FutureDream, 
  ChatMessage, 
  PeaceRoomData,
  MoodStatus,
  Notification as AppNotification,
  Countdown
} from '../types';
import { 
  INITIAL_MILESTONES, 
  INITIAL_MEMORIES, 
  INITIAL_SONGS, 
  INITIAL_REASONS, 
  INITIAL_LETTERS, 
  INITIAL_OPEN_WHEN, 
  INITIAL_THINGS21, 
  INITIAL_FUTURE_DREAMS, 
  INITIAL_MESSAGES 
} from '../data/initialData';

// Storage Helper
const getLocal = <T>(key: string, initial: T): T => {
  try {
    const item = localStorage.getItem(`3zab_nouna_${key}`);
    return item ? JSON.parse(item) : initial;
  } catch {
    return initial;
  }
};

const setLocal = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(`3zab_nouna_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
};

// Store Hooks / Subscriptions with Firebase Fallback
export function subscribeCollection<T extends { id: string }>(
  collectionName: string,
  initialData: T[],
  callback: (data: T[]) => void
) {
  let localData = getLocal<T[]>(collectionName, initialData);
  if (!localStorage.getItem(`3zab_nouna_${collectionName}`)) {
    setLocal(collectionName, initialData);
  }
  callback(localData);

  try {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          })) as T[];
          setLocal(collectionName, items);
          callback(items);
        } else {
          callback(localData);
        }
      },
      (error) => {
        if (error.code === 'permission-denied') window.dispatchEvent(new Event('sanctuary-sync-denied'));
        console.warn(`Firebase snapshot error for ${collectionName}, using local:`, error);
        callback(localData);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn(`Firebase offline fallback for ${collectionName}:`, err);
    callback(localData);
    return () => {};
  }
}

export async function addItem<T extends Record<string, any>>(collectionName: string, item: T) {
  const newItem = {
    ...item,
    createdAt: Date.now()
  };

  // 1. Update local storage immediately for optimistic UI
  const current = getLocal<any[]>(collectionName, []);
  const tempId = `temp_${Date.now()}`;
  const localItem = { id: tempId, ...newItem };
  setLocal(collectionName, [localItem, ...current]);

  // 2. Sync to Firebase Firestore
  try {
    const docRef = await addDoc(collection(db, collectionName), newItem);
    return docRef.id;
  } catch (err) {
    console.warn(`Firebase write error for ${collectionName}, saved locally:`, err);
    return tempId;
  }
}

export async function updateItem(collectionName: string, id: string, updates: Record<string, any>) {
  // 1. Update local storage immediately
  const current = getLocal<any[]>(collectionName, []);
  const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
  setLocal(collectionName, updated);

  // 2. Sync to Firebase Firestore
  try {
    if (!id.startsWith('temp_')) {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updates);
    }
  } catch (err) {
    console.warn(`Firebase update error for ${collectionName}:`, err);
  }
}

export async function removeItem(collectionName: string, id: string) {
  // 1. Local update
  const current = getLocal<any[]>(collectionName, []);
  const filtered = current.filter(item => item.id !== id);
  setLocal(collectionName, filtered);

  // 2. Firebase sync
  try {
    if (!id.startsWith('temp_')) {
      await deleteDoc(doc(db, collectionName, id));
    }
  } catch (err) {
    console.warn(`Firebase delete error for ${collectionName}:`, err);
  }
}

// Special Peace Room Store
export function subscribePeaceRoom(callback: (data: PeaceRoomData) => void) {
  const defaultData: PeaceRoomData = { reconciled: false, updatedAt: Date.now() };
  let local = getLocal<PeaceRoomData>('peaceRoom', defaultData);
  callback(local);

  try {
    const unsubscribe = onSnapshot(doc(db, 'peaceRoom', 'currentSession'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as PeaceRoomData;
        setLocal('peaceRoom', data);
        callback(data);
      }
    });
    return unsubscribe;
  } catch {
    return () => {};
  }
}

export async function savePeaceRoom(data: PeaceRoomData) {
  setLocal('peaceRoom', data);
  try {
    await setDoc(doc(db, 'peaceRoom', 'currentSession'), data);
  } catch (err) {
    console.warn('Firebase peace room error:', err);
  }
}

// --- Mood Status Store ---
export function subscribeMoods(callback: (data: MoodStatus[]) => void) {
  const local = getLocal<MoodStatus[]>('moods', []);
  callback(local);

  try {
    const unsubscribe = onSnapshot(collection(db, 'moods'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => ({
          ...docSnap.data()
        })) as MoodStatus[];
        setLocal('moods', items);
        callback(items);
      }
    });
    return unsubscribe;
  } catch {
    return () => {};
  }
}

export async function saveMood(mood: MoodStatus) {
  const current = getLocal<MoodStatus[]>('moods', []);
  const updated = current.filter(m => m.identity !== mood.identity);
  updated.push(mood);
  setLocal('moods', updated);

  try {
    await setDoc(doc(db, 'moods', mood.identity), mood);
  } catch (err) {
    console.warn('Firebase mood error:', err);
  }
}

// --- Notifications Store ---
export async function addNotification(notif: Omit<AppNotification, 'id'>) {
  return addItem('notifications', notif);
}

export async function markNotificationRead(id: string) {
  return updateItem('notifications', id, { isRead: true });
}

export async function removeNotification(id: string) {
  return removeItem('notifications', id);
}

