import { Component, OnInit } from '@angular/core';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'books-table',
    template: require('./books-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class BooksTableComponent implements OnInit {
    books: Book[] = [];
    selectedBook: Book = <Book>{};

    constructor(private bookService: BookService) { }

    getBooks(): void {
        this.bookService.getBooks().then(books => this.books = books);
    }
    ngOnInit(): void {
        this.getBooks();
    }
    selectRow(book: Book): void {
        this.selectedBook = book;
        this.bookService.selectedBook = book;
        this.canDelete();
    }
    canEdit() {
        if(this.selectedBook.id != null) {
            return null;
            // again with the hacky null return
        } else {
            return true;
        }
    }
    canDelete() {
        if(this.selectedBook.issued == 0) {
            return null;
            // this is super hacky, angular wont accept false.
        } else {
            return true;
        }
    }
    deleteBook(book: Book): void {
        this.bookService
            .delete(book.id)
            .then(() => {
            this.books = this.books.filter(b => b !== book);
            if (this.selectedBook === book) { this.selectedBook = <Book>{}; }
        });
    }
}
