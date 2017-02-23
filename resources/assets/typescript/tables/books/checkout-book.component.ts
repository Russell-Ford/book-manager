import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';

import { Book } from './book';
import { BookService } from './book.service';
import { Transaction } from '../transactions/transaction';
import { TransactionService } from '../transactions/transaction.service';

@Component({
    selector: 'checkout-form',
    template: `
        <div class="col-md-3" style="float:right">
            <h1>Checkout</h1>
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()"> 
                <div class="form-group">
                    <label for="account_id">Enter account number</label>
                    <input type="text" class="form-control" id="account_id" formControlName="account_id" required>
                    <div *ngIf="formErrors.account_id" class="alert alert-danger">
                        {{ formErrors.account_id }}
                    </div>
                </div>
                <button type="submit" class="btn btn-success" [disabled]="!checkoutForm.valid">Submit</button>
                <button type="button" (click)="goBack()" class="btn btn-danger">Cancel</button>
            </form>
        </div>
    `
})
export class TransactionCheckoutComponent implements OnInit {
    book: Book;
    transaction: Transaction;
    checkoutForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private transactionService: TransactionService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.book = this.bookService.selectedBook;
        this.buildForm();
    }
    buildForm(): void {
        this.checkoutForm = this.fb.group({
            'account_id': ['', [
                Validators.required
                ]
            ]
        });

        this.checkoutForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.checkoutForm) { return; }
        const form = this.checkoutForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    onSubmit(): void {
        this.transaction = this.checkoutForm.value;
        this.transaction.book_id = this.book.id;
        console.log(this.transaction);
        this.save();
    }
    save(): void {
      this.transactionService.create(this.transaction)
          .then(() => this.goBack());
    }
    goBack(): void {
        this.location.back();
    }
    formErrors = {
        'account_id': ''
    };

    validationMessages = {
        'account_id': {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 4 characters long.',
            'maxlength':     'Name cannot be more than 24 characters long.',
        }
    };
}
