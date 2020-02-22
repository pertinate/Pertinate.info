import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import serviceAccount from '../../../config/pertinate-info-firebase-adminsdk-68by7-5a2ff9d7d9.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pertinate-info.firebaseio.com',
});

firebase.initializeApp({
    apiKey: 'AIzaSyCEJhDElHSuPLXF9_8CKCgmgCnjCw67Ktg',
    authDomain: 'pertinate-info.firebaseapp.com',
    databaseURL: 'https://pertinate-info.firebaseio.com',
    projectId: 'pertinate-info',
    storageBucket: 'pertinate-info.appspot.com',
    messagingSenderId: '281043960559',
    appId: '1:281043960559:web:a0fabe5ef2b2b5bba1111a',
    measurementId: 'G-HYPX9WGJJ0',
});

export function ValidateToken(token) {
    return new Promise((resolve, reject) => {
        admin
            .auth()
            .verifyIdToken(token, true)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
    });
}

export function GetToken(userID) {
    return new Promise((resolve, reject) => {
        admin
            .auth()
            .createCustomToken(userID)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
    });
}

export function GetUserByEmail(email) {
    return new Promise((resolve, reject) => {
        admin
            .auth()
            .getUserByEmail(email)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
    });
}

export function RegisterNewUser(userID, email, password) {
    return new Promise((resolve, reject) => {
        admin
            .auth()
            .createUser({
                uid: userID,
                email,
                password,
            })
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
    });
}

export function EmailLogin(email, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result.user.uid);
                GetToken(result.user.uid).then(tokenResult => resolve({ userID: result.user.uid, token: tokenResult })).catch(error => reject(error));
            })
            .catch(error => {
                return reject(error);
            });
    });
}
