import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDqDrpmM2nslgeL5rp2ukBr0WCNRtRDyYY",
  authDomain: "crwn-clothing-e4b65.firebaseapp.com",
  projectId: "crwn-clothing-e4b65",
  storageBucket: "crwn-clothing-e4b65.appspot.com",
  messagingSenderId: "39811264959",
  appId: "1:39811264959:web:5d3caca3d2c2526802b10a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch(error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
