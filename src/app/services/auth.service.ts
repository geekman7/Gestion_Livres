import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // tslint:disable-next-line: typedef
  createNewUser(email: string, password: string){
      return new Promise(
        // tslint:disable-next-line: no-shadowed-variable
        (resolve, reject) =>{
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
  }


  // tslint:disable-next-line: typedef
  signInUser(email: string, password: string){
    return new Promise(
      // tslint:disable-next-line: no-shadowed-variable
      (resolve, reject) =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }


  // tslint:disable-next-line: typedef
  signOutUser() {
    firebase.auth().signOut();
  }




}
