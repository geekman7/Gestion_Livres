import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { }

  // tslint:disable-next-line: typedef
  emitBooks(){
    this.booksSubject.next(this.books);
  }

  // tslint:disable-next-line: typedef
  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  // tslint:disable-next-line: typedef
  getBooks(){
    firebase.database().ref('/books')
            .on('value', (data) => {
              this.books = data.val() ? data.val() : [];
              this.emitBooks();
            });
  }

  // tslint:disable-next-line: typedef
  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value')
                .then(
                  (data) => {
                    resolve(data.val());
                  },
                  // tslint:disable-next-line: no-shadowed-variable
                  (error) => {
                    reject(error);
                  }
                );
      }
    );
  }

  // tslint:disable-next-line: typedef
  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // tslint:disable-next-line: typedef
  removeBook(book: Book){
    if (book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        // tslint:disable-next-line: no-shadowed-variable
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }


  // tslint:disable-next-line: typedef
  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
              .child('images/' + almostUniqueFileName + file.name)
              .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,

          () => {
            console.log('Chargement en Cours...');
          },
          // tslint:disable-next-line: no-shadowed-variable
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
  }

}
