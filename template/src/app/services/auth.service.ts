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

  /**
   * Creates a new user account using Firebase Authentication.
   * @param email The user's email address.
   * @param password The user's chosen password.
   * @returns A promise resolving with the user credentials.
   */
  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Logs in an existing user using Firebase Authentication.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns A promise resolving with the user credentials.
   */
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Logs out the currently authenticated user.
   * @returns A promise that resolves once the user is signed out.
   */
  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}
