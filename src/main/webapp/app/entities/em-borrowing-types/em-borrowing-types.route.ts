import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmBorrowingTypesComponent } from './em-borrowing-types.component';
import { EmBorrowingTypesDetailComponent } from './em-borrowing-types-detail.component';
import { EmBorrowingTypesPopupComponent } from './em-borrowing-types-dialog.component';
import { EmBorrowingTypesDeletePopupComponent } from './em-borrowing-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emBorrowingTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
        [
            {
                path: 'em-borrowing-types',
                component: EmBorrowingTypesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emBorrowingTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-borrowing-types/:id',
                component: EmBorrowingTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emBorrowingTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];

export const emBorrowingTypesPopupRoute: Routes = [
    {
        path: 'em-borrowing-types-new',
        component: EmBorrowingTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emBorrowingTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-borrowing-types/:id/edit',
        component: EmBorrowingTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emBorrowingTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-borrowing-types/:id/delete',
        component: EmBorrowingTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emBorrowingTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
