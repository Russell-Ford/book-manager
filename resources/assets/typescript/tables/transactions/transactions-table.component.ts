import { Component, OnInit } from '@angular/core';

import { Transaction }          from './transaction';
import { TransactionService }   from './transaction.service';

@Component({
    selector: 'transactions-table',
    template: require('./transactions-table.component.html'),
    styles: [require('../../app.component.scss')]
})
export class TransactionsTableComponent implements OnInit {
    transactions: Transaction[] = [];
    selectedTransaction: Transaction = <Transaction>{};

    constructor(private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.getTransactions();
    }
    getTransactions(): void {
        this.transactionService.getTransactions()
            .then(transactions => this.transactions = transactions);
    }
    selectRow(transaction: Transaction): void {
        this.selectedTransaction = transaction;
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
            // again with the hacky null return (see books table)
        } else {
            return true;
        }
    }
}
