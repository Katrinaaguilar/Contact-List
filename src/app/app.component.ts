import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;
}
interface Postid extends User{
  id: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userCol: AngularFirestoreCollection<User>;
  user: Observable<User[]>;

  User: any;
  FirstName: string;
  LastName: string;
  Mobile: number;
  PhoneNumber: number;
  Email: string;
  Address: string;

 constructor(private afs: AngularFirestore){}

  ngOnInit() {
    this.userCol = this.afs.collection('user');
    //this.user = this.userCol.valueChanges();
    this.User = this.userCol.snapshotChanges()

    .map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });

  }
  addUser(){
  
    this.afs.collection('User').add({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
    this.afs.collection('User').doc('my-customer-id').set({'First Name': this.FirstName, 'Last Name': this.LastName, 'Mobile': this.Mobile, 'Phone Number': this.PhoneNumber, 'E-mail': this.Email, 'Address': this.Address});
  }
  
 
}
