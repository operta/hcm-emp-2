import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpBorrowingsComponent } from './em-emp-borrowings.component';
import { EmEmpBorrowingsDetailComponent } from './em-emp-borrowings-detail.component';
import { EmEmpBorrowingsPopupComponent } from './em-emp-borrowings-dialog.component';
import { EmEmpBorrowingsDeletePopupComponent } from './em-emp-borrowings-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpBorrowingsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
        [
            {
                path: 'em-emp-borrowings',
                component: EmEmpBorrowingsComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'em-emp-borrowings/:id',
                component: EmEmpBorrowingsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }

];

export const emEmpBorrowingsPopupRoute: Routes = [
    {
        path: 'em-emp-borrowings-new',
        component: EmEmpBorrowingsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-borrowings-new/:employeeId',
        component: EmEmpBorrowingsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-borrowings/:id/edit',
        component: EmEmpBorrowingsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-borrowings/:id/delete',
        component: EmEmpBorrowingsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpBorrowings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
