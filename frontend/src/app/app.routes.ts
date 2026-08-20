import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { BookList } from './components/book-list/book-list';
import { MyQuotes } from './components/my-quotes/my-quotes';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: BookList, canActivate: [authGuard] },
  { path: 'quotes', component: MyQuotes, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];