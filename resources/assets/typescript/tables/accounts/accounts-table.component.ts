import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Account } from './account';
import { AccountService } from './account.service';
import { DisplayParams } from '../shared/params';

@Component({
    selector: 'accounts-table',
    template: require('./accounts-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class AccountsTableComponent implements OnInit {
    accounts: Account[] = [];
    selectedAccount = <Account>{};
    displayParams = <DisplayParams>{};
    subscription = null;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.displayParams.displayPerPage = 25;
        this.displayParams.currentPage = 0;
        this.getLastPageNum();
        this.subscribeRouter();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    subscribeRouter() {
        this.subscription = this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                if(event.url == "/accounts") {
                    this.getAccounts();
                }
            }
        });
    }
    getAccounts(): void {
        this.accountService.getAccounts(this.displayParams)
            .then(accounts => this.accounts = accounts);
    }
    selectRow(account: Account): void {
        this.selectedAccount = account;
        this.accountService.selectAccount(account);
    }
    canEdit() {
        if(this.selectedAccount.id != null) {
            return null;
        } else {
            return true;
        }
    }
    getLastPageNum() {
        this.accountService.getLastPageNum(this.displayParams)
            .then(page => this.displayParams.lastPage = page);
    }
    firstPage() {
        this.displayParams.currentPage = 0;
        this.getAccounts();
    }
    lastPage() {
        console.log(this.displayParams.lastPage);
        this.displayParams.currentPage = this.displayParams.lastPage;
        this.getAccounts();
    }
    nextPage() {
        if(this.displayParams.currentPage != this.displayParams.lastPage) {
            this.displayParams.currentPage += 1;
            this.getAccounts();
        }
    }
    previousPage() {
        if(this.displayParams.currentPage != 0) {
            this.displayParams.currentPage -= 1;
            this.getAccounts();
        }
    }
    setLimit(limit: number) {
        this.displayParams.displayPerPage = limit;
        this.firstPage();
        this.getLastPageNum();
        this.getAccounts();
    }
}

