// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideRouter } from '@angular/router'; // <-- For standalone routing
import { routes } from './app/app.routes';      // <-- Your routes config (with path: 'cascading')

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Firebase imports for Auth + Realtime Database
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'; // If you're using Realtime Database

// 1. Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBc2GLMsHzAr6X4H1Dnc6BY4Gitr-S6K0",
  authDomain: "template-2f74d.firebaseapp.com",
  databaseURL: "https://template-2f74d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "template-2f74d",
  storageBucket: "template-2f74d.firebasestorage.app",
  messagingSenderId: "847376972718",
  appId: "1:847376972718:web:7bfabf739cf97e78a4e63f",
  measurementId: "G-H1T4C9K13Z"
};

// 2. Initialize Firebase if not already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized (Realtime Database enabled).');
}

// The translation loader factory
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// 3. Bootstrap your Angular app with providers
bootstrapApplication(AppComponent, {
  providers: [
    // Provide HttpClient
    provideHttpClient(withInterceptorsFromDi()),

    // Provide translations
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    // Provide the router with your defined routes (including /cascading)
    provideRouter(routes),

    // Possibly other providers...
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
