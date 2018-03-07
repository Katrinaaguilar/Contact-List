import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseUrl: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
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
