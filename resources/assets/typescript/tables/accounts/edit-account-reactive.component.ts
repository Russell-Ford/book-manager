import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';

import { Account }                         from './account';
import { AccountService }                  from './account.service';

@Component({
    selector: 'add-account-form',
    template: require('./account-form-reactive.component.html')
})
export class EditAccountFormComponent implements OnInit {
    account: Account;
    formType = 'Edit';

    submitted = false;

    onSubmit() {
        const account_id = this.account.id;
        this.account = this.accountForm.value;
        this.account.id = account_id;
        this.save();
    }

    accountForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.account = this.accountService.selectedAccount;
        this.buildForm();
    }

    buildForm(): void {
        this.accountForm = this.fb.group({
            'first_name': [this.account.first_name, [
                Validators.required
                ]
            ],
            'last_name': [this.account.last_name, [
                Validators.required
                ]
            ],
            'email': [this.account.email, [
                Validators.required
                ]
            ]
        });

        this.accountForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.accountForm) { return; }
        const form = this.accountForm;

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
        this.accountService.update(this.account)
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
        'first_name': '',
        'last_name': '',
        'email': '',
        'server': ''
    };
    serverErrors = null;

    validationMessages = {
        'first_name': {
            'required':      'Name is required.'
        },
        'last_name': {
            'required': 'Author is required.'
        },
        'email': {
            'required': 'email is required.'
        }
    };
}
