import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';

import { Transaction }                         from './transaction';
import { TransactionService }                  from './transaction.service';

@Component({
    selector: 'edit-transaction-form',
    template: require('./edit-transaction-form.component.html')
})
export class EditTransactionFormComponent implements OnInit {
    transaction: Transaction;

    submitted = false;

    onSubmit() {
        const transaction_id = this.transaction.id;
        this.transaction = this.transactionForm.value;
        this.transaction.id = transaction_id;
        this.save();
    }

    transactionForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private transactionService: TransactionService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.transaction = this.transactionService.selectedTransaction;
        this.buildForm();
    }

    buildForm(): void {
        this.transactionForm = this.fb.group({
            'book_id': [this.transaction.book_id, [
                Validators.required
                ]
            ],
            'account_id': [this.transaction.account_id, [
                Validators.required
                ]
            ],
            'date_issued': [this.transaction.date_issued, [
                Validators.required
                ]
            ],
            'date_returned': [this.transaction.date_returned, [
                ]
            ]
        });

        this.transactionForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.transactionForm) { return; }
        const form = this.transactionForm;

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

    save(): void {
        this.serverErrors = null;
        this.transactionService.update(this.transaction)
        .then(res => { this.serverErrors = res;
            if(this.serverErrors['success'] != null) {
                this.submitted = true;
                this.goBack();
            }
        });
    }
    goBack(): void {
        this.location.back();
    }

    formErrors = {
        'book_id': '',
        'account_id': '',
        'date_issued': '',
        'date_returned': '',
        'server': ''
    };
    serverErrors = null;

    validationMessages = {
        'book_id': {
            'required':      'Book ID is required.'
        },
        'account_id': {
            'required': 'Account ID is required.'
        },
        'date_issued': {
            'required': 'Date issued is required.'
        },
        'date_returned': {
        }
    };
}
