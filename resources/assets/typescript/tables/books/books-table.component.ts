import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Book } from './book';
import { BookService } from './book.service';
import { DisplayParams } from '../shared/params';

@Component({
    selector: 'books-table',
    template: require('./books-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class BooksTableComponent implements OnInit {
    books: Book[] = [];
    selectedBook: Book = <Book>{};
    displayParams = <DisplayParams>{}; 
    subscription = null;

    constructor(
        private bookService: BookService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.displayParams.displayPerPage = 25;
        this.displayParams.currentPage = 0;
        this.getLastPageNum();
        this.getBooks();
        this.subscribeRouter();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    subscribeRouter() {
        this.subscription = this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                if(event.url == "/books") {
                    this.getBooks();
                }
            }
        });
    }
    getBooks(): void {
        this.bookService.getBooks(this.displayParams)
            .then(books => this.books = books);
    }
    selectRow(book: Book): void {
        this.selectedBook = book;
        this.bookService.selectedBook = book;
        this.canDelete();
    }
    canCheckout() {
        if(this.selectedBook.id != null) {
            return null;
        } else {
            return true;
        }
    }
    canEdit() {
        if(this.selectedBook.id != null) {
            return null;
        } else {
            return true;
        }
    }
    canDelete() {
        if(this.selectedBook.issued == 0) {
            return null;
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
    getLastPageNum() {
        this.bookService.getLastPageNum(this.displayParams)
            .then(page => this.displayParams.lastPage = page);
    }
    firstPage() {
        this.displayParams.currentPage = 0;
        this.getBooks();
    }
    lastPage() {
        console.log(this.displayParams.lastPage);
        this.displayParams.currentPage = this.displayParams.lastPage;
        this.getBooks();
    }
    nextPage() {
        if(this.displayParams.currentPage != this.displayParams.lastPage) {
            this.displayParams.currentPage += 1;
            this.getBooks();
        }
    }
    previousPage() {
        if(this.displayParams.currentPage != 0) {
            this.displayParams.currentPage -= 1;
            this.getBooks();
        }
    }
    setLimit(limit: number) {
        this.displayParams.displayPerPage = limit;
        this.firstPage();
        this.getLastPageNum();
        this.getBooks();
    }
}
