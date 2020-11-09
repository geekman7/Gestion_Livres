import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';

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
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

}
