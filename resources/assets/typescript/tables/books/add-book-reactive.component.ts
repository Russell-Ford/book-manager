import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';

import { Book }             from './book';
import { BookService }      from './book.service';

@Component({
    selector: 'add-book',
    template: require('./book-form-reactive.component.html')
})
export class AddBookFormComponent implements OnInit {
    book: Book;
    formType = "Add";

    submitted = false;

    onSubmit() {
        this.book = this.bookForm.value;
        this.book.issued = 0;
        this.save();
    }

    bookForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.book = this.bookService.selectedBook;
        this.buildForm();
    }

    buildForm(): void {
        this.bookForm = this.fb.group({
            'title': ['', [
                Validators.required
                ]
            ],
            'author': ['', [
                Validators.required
                ]
            ],
            'isbn': ['', [
                Validators.required,
                Validators.minLength(13),
                Validators.maxLength(13)
                ]
            ],
            'total': ['', [
                Validators.required
                ]
            ],
            'issued': ['0', [
                Validators.required
                ]
            ],
            'publish_date': ['', [
                Validators.required
                ]
            ],
            'category': ['', [
                Validators.required
                ]
            ]
        });

        this.bookForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
        if (!this.bookForm) { return; }
        const form = this.bookForm;

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
        this.bookService.create(this.book)
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
        'title': '',
        'author': '',
        'isbn': '',
        'total': '',
        'publish_date': '',
        'category': ''
    };
    serverErrors = null;

    validationMessages = {
        'title': {
            'required':      'Name is required.'
        },
        'author': {
            'required': 'Author is required.'
        },
        'isbn': {
            'required': 'ISBN is required.',
            'minlength': 'ISBN must be 13 characters',
            'maxlength': 'ISBN must be 13 characters'
        },
        'total': {
            'required': 'Total is required.'
        },
        'issued': {
            'required': 'You shouldn\'t see this.'
        },
        'publish_date': {
            'required': 'Publish date is required.'
        },
        'category': {
            'required': 'Category is required.'
        }
    };
}
