import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    settingsRoute
} from './';
import {DashboardComponent} from "../layouts/dashboard/dashboard.component";

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: ACCOUNT_ROUTES
}];
