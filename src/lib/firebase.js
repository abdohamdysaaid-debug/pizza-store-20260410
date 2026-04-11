import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDocs, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBPqK5E0kRTgPSto2Yy9FYlKjk_2wx9a8k",
  authDomain: "pizza-pubs.firebaseapp.com",
  projectId: "pizza-pubs",
  storageBucket: "pizza-pubs.firebasestorage.app",
  messagingSenderId: "543825814867",
  appId: "1:543825814867:web:02439ea19db92aa9c42da6"
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
