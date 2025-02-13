import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // We store the current user in a BehaviorSubject
  private userSubject = new BehaviorSubject<firebase.User | null>(null);

  // Publicly expose it as an Observable
  public user$: Observable<firebase.User | null> = this.userSubject.asObservable();

  constructor() {
    // Listen for changes in the Firebase Auth state
    firebase.auth().onAuthStateChanged((user) => {
      console.log('AuthService onAuthStateChanged =>', user);
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('AuthService: Logged in =>', credential.user);
      return credential;
    } catch (error) {
      console.error('AuthService: Login error =>', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('AuthService: Signed up =>', credential.user);
      return credential;
    } catch (error) {
      console.error('AuthService: Sign up error =>', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await firebase.auth().signOut();
      console.log('AuthService: Logged out');
    } catch (error) {
      console.error('AuthService: Logout error =>', error);
      throw error;
    }
  }
}