import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Transaction } from './transaction';

@Injectable()
export class TransactionService {
    public selectedTransaction: Transaction;
    private transactionsUrl = 'api/transactions';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    selectTransaction(transaction: Transaction): void {
        this.selectedTransaction = transaction;
    }
    getSelectedTransaction(): Promise<Transaction> {
        return Promise.resolve(this.selectedTransaction);
    }
    getTransactions(): Promise<Transaction[]> {
        return this.http.get(this.transactionsUrl)
                    .toPromise()
                    .then(response => response.json() as Transaction[])
                    .catch(this.handleError);
    }
    returnBook(transaction: Transaction): Promise<Transaction> {
        const url = this.transactionsUrl + '/' + transaction.id;
        return this.http
            .put(url, JSON.stringify(transaction), {headers: this.headers})
            .toPromise()
            .then(() => transaction)
            .catch(this.handleError);
    }
    create(transaction: any): Promise<any> {
        return this.http
            .post(this.transactionsUrl, JSON.stringify(transaction), {headers: this.headers})
            .toPromise()
            .then(res => console.log(res))
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
