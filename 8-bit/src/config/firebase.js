import firebase from 'firebase'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBmumZJp69gho3mtiso0B0KXluBEOj5rtI',
  authDomain: 'orbital-8-bit.firebaseapp.com',
  projectId: 'orbital-8-bit',
  storageBucket: 'orbital-8-bit.appspot.com',
  messagingSenderId: '376646715941',
  appId: '1:376646715941:web:7aff7945613ae5ad6ecdcc',
  measurementId: 'G-J62P42GZ9P',
})

export const auth = app.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider()

export default app
