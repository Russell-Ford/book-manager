import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditAccountFormComponent } from './edit-account-reactive.component';
import { AddAccountFormComponent } from './add-account-reactive.component';

@NgModule({
    imports:      [ CommonModule, ReactiveFormsModule ],
    declarations: [ EditAccountFormComponent, AddAccountFormComponent ],
    exports:      [ EditAccountFormComponent, AddAccountFormComponent ]
})
export class AccountFormReactiveModule { }
