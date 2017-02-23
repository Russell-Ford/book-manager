import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { TransactionsTableComponent }   from './tables/transactions/transactions-table.component';
import { AccountsTableComponent }       from './tables/accounts/accounts-table.component';
import { AddAccountFormComponent }      from './tables/accounts/add-account-reactive.component';
import { EditAccountFormComponent }     from './tables/accounts/edit-account-reactive.component';
import { BooksTableComponent }          from './tables/books/books-table.component';
import { AddBookFormComponent }         from './tables/books/add-book-reactive.component';
import { EditBookFormComponent }        from './tables/books/edit-book-reactive.component';
import { TransactionCheckoutComponent } from './tables/books/checkout-book.component.ts';
import { EmptyComponent }               from './empty.component';

const routes: Routes = [
    { path: 'books', component: BooksTableComponent,
        children: [ 
        { path: '', component: EmptyComponent },
        { path: 'checkout', component: TransactionCheckoutComponent },
        { path: 'add', component: AddBookFormComponent },
        { path: 'edit', component: EditBookFormComponent }
        ]
    },
    { path: 'transactions', component: TransactionsTableComponent },
    { path: 'accounts', component: AccountsTableComponent,
        children: [
        { path: '', component: EmptyComponent },
        { path: 'add', component: AddAccountFormComponent },
        { path: 'edit', component: EditAccountFormComponent }
        ]
    },
    { path: '', redirectTo: 'books', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
