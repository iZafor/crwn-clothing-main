import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCbzkiCbDcbbe-OPvxqShfXxwkvf5kBvak",
    authDomain: "crwn-clothing-db-4a579.firebaseapp.com",
    projectId: "crwn-clothing-db-4a579",
    storageBucket: "crwn-clothing-db-4a579.appspot.com",
    messagingSenderId: "516094994964",
    appId: "1:516094994964:web:2d357e9a756f2997105501"
};


const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userDocRef;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("error creating the user: ", error.message);
        }

        return userDocRef;
    }
}