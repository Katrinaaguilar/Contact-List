import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

var firebaseConfig = {
  apiKey: "AIzaSyCnbtSCwUjMBuo_PIWIP1GMgRuPdfgqnZs",
  authDomain: "firestore-53eb8.firebaseapp.com",
  databaseURL: "https://firestore-53eb8.firebaseio.com",
  projectId: "firestore-53eb8",
  storageBucket: "firestore-53eb8.appspot.com",
  messagingSenderId: "159522269163"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
