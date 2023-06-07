import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './config'

const initApp = initializeApp(firebaseConfig)
const dbFirestore = getFirestore(initApp)

export { dbFirestore }