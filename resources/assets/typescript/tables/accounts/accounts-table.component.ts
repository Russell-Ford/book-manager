import { Component, OnInit } from '@angular/core';

import { Account } from './account';
import { AccountService } from './account.service';

@Component({
    selector: 'accounts-table',
    template: require('./accounts-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class AccountsTableComponent implements OnInit {
    accounts: Account[] = [];
    selectedAccount = <Account>{};

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.getAccounts();
    }
    getAccounts(): void {
        this.accountService.getAccounts().then(accounts => this.accounts = accounts);
    }
    selectRow(account: Account): void {
        this.selectedAccount = account;
        this.accountService.selectAccount(account);
    }
}

