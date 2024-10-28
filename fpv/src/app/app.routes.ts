import { Routes } from '@angular/router';
import { LoginComponent } from './components/features/login/login.component';
import { FundsComponent } from './components/features/funds/funds.component';
import { TransactionsComponent } from './components/features/transactions/transactions.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'funds', 
        component: FundsComponent,
    }, 
    {
        path: 'transactions',
        component: TransactionsComponent,
    }
];
