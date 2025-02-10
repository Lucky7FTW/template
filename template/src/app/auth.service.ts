import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBc2GLMsHzAr6X4H1Dnc6BY4iGitr-S6K0",
  authDomain: "template-2f74d.firebaseapp.com",
  projectId: "template-2f74d",
  storageBucket: "template-2f74d.firebasestorage.app",
  messagingSenderId: "847376972718",
  appId: "1:847376972718:web:7bfabf739cf97e78a4e63f",
  measurementId: "G-H1T4C9K13Z"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}


  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }


  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}
