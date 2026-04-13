import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDocs, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let firestoreInstance = null

function hasFirebaseConfig() {
  return Object.values(firebaseConfig).every(Boolean)
}

function getFirestoreInstance() {
  if (!hasFirebaseConfig()) {
    return null
  }

  if (!firestoreInstance) {
    const app = initializeApp(firebaseConfig)
    firestoreInstance = getFirestore(app)
  }

  return firestoreInstance
}

export function getFirebaseStatus() {
  return hasFirebaseConfig()
}

export async function saveOrderToFirebase(order) {
  const db = getFirestoreInstance()
  if (!db) {
    return { saved: false, reason: 'missing_config' }
  }

  const payload = {
    ...order,
    createdAt: order.createdAt,
    firebaseCreatedAt: serverTimestamp(),
  }

  const response = await addDoc(collection(db, 'orders'), payload)
  return { saved: true, id: response.id }
}

export async function loadOrdersFromFirebase() {
  const db = getFirestoreInstance()
  if (!db) {
    return []
  }

  const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(ordersQuery)
  return snapshot.docs.map((document) => ({
    firebaseId: document.id,
    ...document.data(),
  }))
}
