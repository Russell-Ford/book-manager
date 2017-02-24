import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

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
    getTransactions(inputParams: any): Promise<Transaction[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('displayPerPage', inputParams.displayPerPage);
        params.set('currentPage', inputParams.currentPage);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.transactionsUrl, requestOptions)
                    .toPromise()
                    .then(response => response.json() as Transaction[])
                    .catch(this.handleError);
    }
    getPendingTransactions(inputParams: any): Promise<Transaction[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('displayPerPage', inputParams.displayPerPage);
        params.set('currentPage', inputParams.currentPage);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.transactionsUrl + '/pending', requestOptions)
                    .toPromise()
                    .then(response => response.json() as Transaction[])
                    .catch(this.handleError);
    }
    getLastPageNum(inputParams: any): Promise<any> { 
        let params: URLSearchParams = new URLSearchParams();
        params.set('displayPerPage', inputParams.displayPerPage);
        params.set('currentPage', inputParams.currentPage);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.transactionsUrl + '/last', requestOptions)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    returnBook(transaction: Transaction): Promise<Transaction> {
        const url = this.transactionsUrl + '/return/' + transaction.id;
        return this.http
            .put(url, JSON.stringify(transaction), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    create(transaction: any): any {
        return this.http
            .post(this.transactionsUrl, JSON.stringify(transaction), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    update(transaction: Transaction): Promise<any> {
        const url = this.transactionsUrl + '/' + transaction.id;
        return this.http
            .put(url, JSON.stringify(transaction), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
