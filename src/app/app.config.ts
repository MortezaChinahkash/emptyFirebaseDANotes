import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-eacbf","appId":"1:433094340267:web:53f154a0cad6660442d1ee","storageBucket":"danotes-eacbf.firebasestorage.app","apiKey":"AIzaSyCGAP3LwmxrLFW9KGMrDUwt5rwqA1zbgDQ","authDomain":"danotes-eacbf.firebaseapp.com","messagingSenderId":"433094340267"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
