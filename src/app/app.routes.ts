import { Routes } from '@angular/router';
import {Login} from "./components/login/login";
import {Home} from "./components/home/home";
import {authGuard} from "./guards/authGuard";

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', canActivate: [authGuard] , component: Home },
];
