import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Transaction }          from './transaction';
import { TransactionService }   from './transaction.service';
import { DisplayParams } from '../shared/params';

@Component({
    selector: 'transactions-table',
    template: require('./transactions-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class TransactionsTableComponent implements OnInit {
    transactions: Transaction[] = [];
    selectedTransaction: Transaction = <Transaction>{};
    displayParams = <DisplayParams>{}; 
    viewPending = false;
    subscription = null;

    constructor(
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.displayParams.displayPerPage = 25;
        this.displayParams.currentPage = 0;
        this.getLastPageNum();
        this.subscribeRouter();
    }
    subscribeRouter() {
        this.subscription = this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                if(event.url == "/transactions") {
                    this.getTransactions(this.viewPending);
                }
            }
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    getTransactions(viewPending?: boolean): void {
        if(viewPending) {
            this.transactionService.getPendingTransactions(this.displayParams)
                .then(transactions => this.transactions = transactions);
        } else {
            this.transactionService.getTransactions(this.displayParams)
                .then(transactions => this.transactions = transactions);
        }
    }
    selectRow(transaction: Transaction): void {
        this.selectedTransaction = transaction;
        this.transactionService.selectTransaction(transaction);
    }
    returnBook(transaction: Transaction): void {
        this.transactionService.returnBook(transaction)
            .then(() => {
                this.getTransactions(this.viewPending)
        });
    }
    canReturn() {
        if(this.selectedTransaction.date_returned == null) {
            return null;
        } else {
            return true;
        }
    }
    canEdit() {
        if(this.selectedTransaction.id != null) {
            return null;
        } else {
            return true;
        }
    }
    getLastPageNum() {
        this.transactionService.getLastPageNum(this.displayParams)
            .then(page => this.displayParams.lastPage = page);
    }
    firstPage() {
        this.displayParams.currentPage = 0;
        this.getTransactions(this.viewPending);
    }
    lastPage() {
        this.displayParams.currentPage = this.displayParams.lastPage;
        this.getTransactions(this.viewPending);
    }
    nextPage() {
        if(this.displayParams.currentPage != this.displayParams.lastPage) {
            this.displayParams.currentPage += 1;
            this.getTransactions(this.viewPending);
        }
    }
    previousPage() {
        if(this.displayParams.currentPage != 0) {
            this.displayParams.currentPage -= 1;
            this.getTransactions(this.viewPending);
        }
    }
    setLimit(limit: number) {
        this.displayParams.displayPerPage = limit;
        this.firstPage();
        this.getLastPageNum();
        this.getTransactions(this.viewPending);
    }
}
