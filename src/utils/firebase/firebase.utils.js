import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCbzkiCbDcbbe-OPvxqShfXxwkvf5kBvak",
    authDomain: "crwn-clothing-db-4a579.firebaseapp.com",
    projectId: "crwn-clothing-db-4a579",
    storageBucket: "crwn-clothing-db-4a579.appspot.com",
    messagingSenderId: "516094994964",
    appId: "1:516094994964:web:2d357e9a756f2997105501",
    returnSecureToken: true
};


const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(firebaseApp);

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            alert("error creating the user: ", error.code);
        }

    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return console.log("failed to create a new user!")

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return console.log("failed to create a new user!")

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb);
