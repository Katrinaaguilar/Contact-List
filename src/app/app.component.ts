import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userCol: AngularFirestoreCollection<User>;
  user: Observable<User[]>;

 constructor(private afs: AngularFirestore){}

  ngOnInit() {
    this.userCol = this.afs.collection('user');
    this.user = this.userCol.valueChanges();

  }
 
}
