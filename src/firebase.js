import { initializeApp, database } from "firebase/app";
import {
GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";

import {
getFirestore,
query,
doc,
getDocs,
setDoc,
updateDoc,
deleteDoc,
collection,
where,
addDoc,
} from "firebase/firestore";

import {getDatabase, set, ref, onValue, update} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCh42ksSg1Gi8UIn6umOt_zdD39m-UvkPY",
  authDomain: "fir-auth-article-eb8f1.firebaseapp.com",
  databaseURL: "https://fir-auth-article-eb8f1-default-rtdb.firebaseio.com",
  projectId: "fir-auth-article-eb8f1",
  storageBucket: "fir-auth-article-eb8f1.appspot.com",
  messagingSenderId: "110740258313",
  appId: "1:110740258313:web:4ba82b163b10b3d1f3c2d8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const datab = getDatabase(app);

// console.log("Database Realtime:", JSON.stringify(datab));

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        balance: 0,
        userCred: 1,
      });
      const sRef = ref(datab, `users/${user.displayName}`);
       set(sRef, {
          username: user.displayName,
          email: user.email,
          authProvider: "local",
          balance: 0,
          userCred: 1,

        });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
    logout();
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // console.log(`User from firebase:`, user);
   
    var reff=doc(db, `users/${email}`);
    await setDoc(
        reff,{
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          balance: 0,
          userCred: 1,
        });
        const sRef = ref(datab, `users/${name}`);
       set(sRef, {
          username: name,
          email: email,
          authProvider: "local",
          balance: 0,
          userCred: 1,

        });
        onValue(sRef, (snapshot) => {
          const data = snapshot.val();
          // console.log(`dataElement`, data);
        });
 
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const updateBalance = async (name, email, amount) => {
  try {
    
    await setDoc(
      doc(db, "users", email),{
          
          balance: amount,

        }, {merge: true});

        const sRef = ref(datab, `users/${name}`);
       update(sRef, {
          balance: amount,
        });
    
  } catch (err) {
    
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  
  signOut(auth);
  alert(`User Logged Out Successfully!`);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
  updateBalance,
  datab
};
