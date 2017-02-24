import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditTransactionFormComponent } from './edit-transaction-form.component';

@NgModule({
    imports:      [ CommonModule, ReactiveFormsModule ],
    declarations: [ EditTransactionFormComponent ],
    exports:      [ EditTransactionFormComponent ]
})
export class TransactionFormModule { }
