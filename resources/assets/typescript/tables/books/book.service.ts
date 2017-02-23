import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Book } from './book';

@Injectable()
export class BookService {
    public selectedBook: Book;
    private booksUrl = 'api/books';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    selectBook(book: Book): void {
        this.selectedBook = book;
    }
    getSelectedBook(): Promise<Book> {
        return Promise.resolve(this.selectedBook);
    }
    getBooks(): Promise<Book[]> {
        return this.http.get(this.booksUrl)
                    .toPromise()
                    .then(response => response.json() as Book[])
                    .catch(this.handleError);
    }
    update(book: Book): Promise<Book> {
        const url = this.booksUrl + '/' + book.id;
        return this.http
            .put(url, JSON.stringify(book), {headers: this.headers})
            .toPromise()
            .then(() => book)
            .catch(this.handleError);
    }
    create(book: any): Promise<any> {
        return this.http
            .post(this.booksUrl, JSON.stringify(book), {headers: this.headers})
            .toPromise()
            .then(res => console.log(res))
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = this.booksUrl + '/' + id;
        return this.http.delete(url, {headers: this.headers})
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
