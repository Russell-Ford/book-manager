import { Component, OnInit } from '@angular/core';

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

    constructor(private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.displayParams.displayPerPage = 25;
        this.displayParams.currentPage = 0;
        this.getLastPageNum();
        this.getTransactions();
    }
    getTransactions(): void {
        if(this.viewPending) {
            this.getPendingTransactions();
        } else {
            this.transactionService.getTransactions(this.displayParams)
                .then(transactions => this.transactions = transactions);
        }
    }
    getPendingTransactions(): void {
        this.transactionService.getPendingTransactions(this.displayParams)
            .then(transactions => this.transactions = transactions);
    }
    refreshTransactions(viewPending: boolean): void {
        if(viewPending) {
            this.getPendingTransactions();
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
        this.transactionService.returnBook(transaction);
        this.getTransactions();
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
        this.getTransactions();
    }
    lastPage() {
        this.displayParams.currentPage = this.displayParams.lastPage;
        this.getTransactions();
    }
    nextPage() {
        if(this.displayParams.currentPage != this.displayParams.lastPage) {
            this.displayParams.currentPage += 1;
            this.getTransactions();
        }
    }
    previousPage() {
        if(this.displayParams.currentPage != 0) {
            this.displayParams.currentPage -= 1;
            this.getTransactions();
        }
    }
    setLimit(limit: number) {
        this.displayParams.displayPerPage = limit;
        this.firstPage();
        this.getLastPageNum();
        this.getTransactions();
    }
}
