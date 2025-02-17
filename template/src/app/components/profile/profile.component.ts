import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // for ngModel
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Define an interface for user preferences
interface UserPreferences {
  defaultLanguage?: string;
  pageMode?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: firebase.User | null = null;
  
  // Preferences with default values
  defaultLanguage: string = 'en';
  pageMode: string = 'light'; // "light" or "dark"
  //default separat
  
  // UI message for feedback
  message: string = '';

  ngOnInit(): void {
    // Get current user from Firebase Auth
    this.user = firebase.auth().currentUser;
    if (this.user) {
      // Use onSnapshot to load preferences in real time
      firebase.firestore().collection('preferences').doc(this.user.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            const prefs = doc.data() as UserPreferences;
            this.defaultLanguage = prefs.defaultLanguage || 'en';
            this.pageMode = prefs.pageMode || 'light';
            console.log('Loaded preferences from Firestore:', prefs);
          } else {
            console.log('No preferences found in Firestore, using defaults.');
          }
        }, error => {
          console.error('Error loading preferences from Firestore:', error);
        });
    } else {
      console.warn('No user logged in.');
    }
  }

  savePreferences(): void {
    if (this.user) {
      const prefsRef = firebase.firestore().collection('preferences').doc(this.user.uid);
      prefsRef.set({
        defaultLanguage: this.defaultLanguage,
        pageMode: this.pageMode
      })
      .then(() => {
        console.log('Preferences saved successfully in Firestore!');
        this.message = 'Preferences saved successfully!';
        setTimeout(() => this.message = '', 3000);
      })
      .catch(error => {
        console.error('Error saving preferences to Firestore:', error);
        this.message = 'Error saving preferences: ' + error.message;
      });
    } else {
      console.error('No user is currently logged in.');
      this.message = 'No user is currently logged in.';
    }
  }
}
