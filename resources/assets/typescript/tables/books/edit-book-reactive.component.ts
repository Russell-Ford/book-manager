import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';

import { Book }                         from './book';
import { BookService }                  from './book.service';
//import { forbiddenBooksValidator }    from './forbidden-books.directive';

@Component({
    selector: 'edit-book-form',
    template: require('./book-form-reactive.component.html')
})
export class EditBookFormComponent implements OnInit {
    book: Book;
    formType = "Edit";

    submitted = false;

    onSubmit() {
        const bookid = this.book.id;
        this.book = this.bookForm.value;
        this.book.id = bookid;
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
            'title': [this.book.title, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
                ]
            ],
            'author': [this.book.author, [
                Validators.required
                ]
            ],
            'isbn': [this.book.isbn, [
                Validators.required,
                Validators.minLength(13),
                Validators.maxLength(13)
                ]
            ],
            'total': [this.book.total, [
                Validators.required
                ]
            ],
            'issued': [this.book.issued, [
                Validators.required
                ]
            ],
            'publish_date': [this.book.publish_date, [
                Validators.required
                ]
            ],
            'category': [this.book.category, [
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
        this.bookService.update(this.book)
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
        'category': '',
        'server': ''
    };
    serverErrors = null;

    validationMessages = {
        'title': {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 4 characters long.',
            'maxlength':     'Name cannot be more than 24 characters long.',
            'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'author': {
            'required': 'Author is required.'
        },
        'isbn': {
            'required': 'ISBN is required.',
            'minLength': 'ISBN must be 13 characters',
            'maxLength': 'ISBN must be 13 characters'
        },
        'total': {
            'required': 'Total is required.'
        },
        'publish_date': {
            'required': 'Publish date is required.'
        },
        'category': {
            'required': 'Category is required.'
        }
    };
}
