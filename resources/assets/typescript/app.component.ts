import { Component } from "@angular/core";


@Component({
    selector: 'my-app',
    template: `
        <h1 class="col-md-offset-1">Book Manager</h1>
            <ul class="nav nav-tabs">
                <li role="presentation"><a routerLink="/books" routerLinkActive="active">Books</a></li>
                <li role="presentation"><a routerLink="/transactions" routerLinkActive="active">Transactions</a></li>
                <li role="presentation"><a routerLink="/accounts" routerLinkActive="active">Accounts</a></li>
            </ul>
            <router-outlet></router-outlet>
    
    `,
    styles: [require('./app.component.scss')]
})
export class AppComponent {
}
