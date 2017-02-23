import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditBookFormComponent } from './edit-book-reactive.component';
import { AddBookFormComponent } from './add-book-reactive.component';
import { TransactionCheckoutComponent } from './checkout-book.component.ts';

@NgModule({
    imports:      [ CommonModule, ReactiveFormsModule ],
    declarations: [ EditBookFormComponent, AddBookFormComponent, TransactionCheckoutComponent ],
    exports:      [ EditBookFormComponent, AddBookFormComponent, TransactionCheckoutComponent ]
})
export class BookFormReactiveModule { }
