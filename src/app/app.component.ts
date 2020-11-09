import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    // tslint:disable-next-line: no-var-keyword
    var firebaseConfig = {
      apiKey: "AIzaSyDkMboBJwO9VeLoihN4eR_JZGzbsFxWtO8",
      authDomain: "livres-e533d.firebaseapp.com",
      databaseURL: "https://livres-e533d.firebaseio.com",
      projectId: "livres-e533d",
      storageBucket: "livres-e533d.appspot.com",
      messagingSenderId: "1047736230196",
      appId: "1:1047736230196:web:4623bd5ffc3aa41f05c561",
      measurementId: "G-YZTGFJM35N"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
