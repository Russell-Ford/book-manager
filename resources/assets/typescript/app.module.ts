import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { BookFormReactiveModule }       from './tables/books/book-form.module';
import { AccountFormReactiveModule }    from './tables/accounts/account-form.module';

import { AppComponent }                 from './app.component';
import { HighlightDirective }           from './highlight.directive';
import { BooksTableComponent }          from './tables/books/books-table.component';
import { BookService }                  from './tables/books/book.service';
import { TransactionsTableComponent }   from './tables/transactions/transactions-table.component';
import { TransactionService }           from './tables/transactions/transaction.service';
import { AccountService }               from './tables/accounts/account.service';
import { AccountsTableComponent }       from './tables/accounts/accounts-table.component';
import { EmptyComponent }               from './empty.component';


@NgModule({
  imports: [
  	BrowserModule,
  	FormsModule,
    HttpModule,
    BookFormReactiveModule,
    AccountFormReactiveModule,
    AppRoutingModule
  ],
  declarations: [ 
  	AppComponent,
    HighlightDirective,
    BooksTableComponent,
    TransactionsTableComponent,
    AccountsTableComponent,
    EmptyComponent
  ],
  providers: [
    BookService,
    TransactionService,
    AccountService
  ],
  bootstrap: [
  	AppComponent
  ]
})
export class AppModule { }
