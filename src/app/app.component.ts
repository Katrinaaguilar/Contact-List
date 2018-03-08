import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Contact {
  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;
 
}
interface ContactId extends Contact{
  id: string;

  
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  contactsCol: AngularFirestoreCollection<Contact>;
  contacts: any;

  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;

  contactDoc: AngularFirestoreDocument<Contact>;
  contact: Observable<Contact>;

 constructor(private afs: AngularFirestore){

 }

  ngOnInit() {
    this.contactsCol = this.afs.collection('contacts');
    //this.contacts = this.contactsCol.valueChanges();
    this.contacts = this.contactsCol.snapshotChanges()

    .map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });

  }
  addContact(){
  
    //this.afs.collection('contacts').add({'FirstName': this.FirstName, 'LastName': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
    this.afs.collection('contacts').doc('my-custom-id').set({'FirstName': this.FirstName, 'LastName': this.LastName, 'Mobile': this.Mobile, 'PhoneNumber': this.PhoneNumber, 'Email': this.Email, 'Address': this.Address});
  }
  getContact(contactId){
    this.contactDoc = this.afs.doc('contacts/'+ contactId);
    this.contact = this.contactDoc.valueChanges();
  }
  deleteContact(contactsId){
    this.afs.doc('contacts/' + contactsId).delete();
  }
 
}
