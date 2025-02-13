import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  public user$: Observable<firebase.User | null> = this.userSubject.asObservable();

  constructor() {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      console.log('AuthService: onAuthStateChanged =>', user);
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('AuthService: Logged in =>', credential.user);
      return credential;
    } catch (error: any) {
      console.error('AuthService: Login error =>', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('AuthService: Signed up =>', credential.user);
      return credential;
    } catch (error: any) {
      console.error('AuthService: Sign up error =>', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await firebase.auth().signOut();
      console.log('AuthService: Logged out');
    } catch (error: any) {
      console.error('AuthService: Logout error =>', error);
      throw error;
    }
  }

  /**
   * Sends a password reset email to the specified email address.
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log('AuthService: Password reset email sent to', email);
    } catch (error: any) {
      console.error('AuthService: Reset password error =>', error);
      throw error;
    }
  }
}
