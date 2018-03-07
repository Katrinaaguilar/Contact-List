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
interface Postid extends Contact{
  id: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  contactCol: AngularFirestoreCollection<Contact>;
  contact: Observable<Contact[]>;

  Contact: any;
  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;
  contactDoc: AngularFirestoreDocument<Contact>;
 // contact: Observable<Contact>;

 constructor(private afs: AngularFirestore){}

  ngOnInit() {
    this.contactCol = this.afs.collection('contact');
    //this.user = this.userCol.valueChanges();
    this.Contact = this.contactCol.snapshotChanges()

    .map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });

  }
  addContact(){
  
    this.afs.collection('Contact').add({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
    this.afs.collection('Contact').doc('my-customer-id').set({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
  }
  getContact(ContactId){
    this.contactDoc = this.afs.doc('contact/'+ContactId);
   // this.contact = this.contactDoc.valueChanges();
  }
  deleteContact(contactId){
    this.afs.doc('contact/' + contactId).delete();
  }
 
}
