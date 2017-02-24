import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Account } from './account';

@Injectable()
export class AccountService {
    public selectedAccount: Account;
    private accountsUrl = 'api/accounts';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    selectAccount(account: Account): void {
        this.selectedAccount = account;
    }
    getAccounts(inputParams: any): Promise<Account[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('displayPerPage', inputParams.displayPerPage);
        params.set('currentPage', inputParams.currentPage);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.accountsUrl, requestOptions)
                    .toPromise()
                    .then(response => response.json() as Account[])
                    .catch(this.handleError);
    }
    getLastPageNum(inputParams: any): Promise<any> { 
        let params: URLSearchParams = new URLSearchParams();
        params.set('displayPerPage', inputParams.displayPerPage);
        params.set('currentPage', inputParams.currentPage);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.accountsUrl + '/last', requestOptions)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    update(account: Account): Promise<any> {
        const url = this.accountsUrl + '/' + account.id;
        return this.http
            .put(url, JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    create(account: any): Promise<any> {
        return this.http
            .post(this.accountsUrl, JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = this.accountsUrl + '/' + id;
        return this.http.delete(url, {headers: this.headers})
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
