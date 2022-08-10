import { app, app as firebase } from "./connectDB";
import { getFirestore, setDoc, collection, onSnapshot, doc} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export var dataUserDB = []
export var dataPassDB = []

export async function addDataDB(data, elem) {
    const db = getFirestore(firebase)
    const colRef = collection(db, elem)
    const docRef = doc(colRef)
    await setDoc(docRef, data)
}

export function readDataDB(elem) {
    const db = getFirestore(firebase)
    let snapshot;
    if(elem === 'user'){
        dataUserDB = []
        snapshot = onSnapshot(collection(db, elem), (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataUserDB.push({
                    id: doc.id,
                    nickname: doc.data().nickname,
                    password: doc.data().password
                })
            });
        })
    }
    else{
        dataPassDB = []
        snapshot = onSnapshot(collection(db, elem), (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataPassDB.push({
                    id: doc.data().userId,
                    nameService: doc.data().nameService,
                    password: doc.data().password

                })
            });
        })
    }
}

export function authData(){
    let bool = true
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;
        let obj = {
            'service' : 'google',
            'nickname' : user.displayName,
            'password' : '' 
        }
        document.getElementById("nameUser").innerText = obj.nickname
        dataUserDB.forEach((elem) => {
            if(elem.service === "google" && elem.nickname === obj.nickname) bool = false
        })
        if(bool === true) addDataDB(obj, 'user')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + '-' + errorMessage)
    });
}