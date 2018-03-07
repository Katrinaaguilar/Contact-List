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

  contacts: any;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  contactsCol: AngularFirestoreCollection<Contact>;
  contacts: Observable<Contact[]>;

  
  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;
  contactDoc: AngularFirestoreDocument<Contact>;
  Contact: Observable<Contact>;

 constructor(private afs: AngularFirestore){}

  ngOnInit() {
    this.contactsCol = this.afs.collection('contacts');
    //this.user = this.userCol.valueChanges();
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
  
    //this.afs.collection('Contact').add({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
    this.afs.collection('contacts').doc('my-custom-id').set({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
  }
  getContact(contactId){
    this.contactDoc = this.afs.doc('contacts/'+ contactId);
    this.contact = this.contactDoc.valueChanges();
  }
  deleteContact(contactsId){
    this.afs.doc('contacts/' + contactsId).delete();
  }
 
}
