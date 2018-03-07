import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpIdentificationsComponent } from './em-emp-identifications.component';
import { EmEmpIdentificationsDetailComponent } from './em-emp-identifications-detail.component';
import { EmEmpIdentificationsPopupComponent } from './em-emp-identifications-dialog.component';
import { EmEmpIdentificationsDeletePopupComponent } from './em-emp-identifications-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpIdentificationsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
        [
            {
                path: 'em-emp-identifications',
                component: EmEmpIdentificationsComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpIdentifications.home.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'em-emp-identifications/:id',
                component: EmEmpIdentificationsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpIdentifications.home.title'
                },
                canActivate: [UserRouteAccessService]
             }
        ]
    }
];

export const emEmpIdentificationsPopupRoute: Routes = [
    {
        path: 'em-emp-identifications-new/:employeeId',
        component: EmEmpIdentificationsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpIdentifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-identifications/:id/edit',
        component: EmEmpIdentificationsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpIdentifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-identifications/:id/delete',
        component: EmEmpIdentificationsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpIdentifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
