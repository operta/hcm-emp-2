import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpEmgContactsComponent } from './em-emp-emg-contacts.component';
import { EmEmpEmgContactsDetailComponent } from './em-emp-emg-contacts-detail.component';
import { EmEmpEmgContactsPopupComponent } from './em-emp-emg-contacts-dialog.component';
import { EmEmpEmgContactsDeletePopupComponent } from './em-emp-emg-contacts-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpEmgContactsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-emg-contacts',
                component: EmEmpEmgContactsComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpEmgContacts.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-emg-contacts/:id',
                component: EmEmpEmgContactsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpEmgContacts.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpEmgContactsPopupRoute: Routes = [
    {
        path: 'em-emp-emg-contacts-new/:employeeId',
        component: EmEmpEmgContactsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpEmgContacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-emg-contacts/:id/edit',
        component: EmEmpEmgContactsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpEmgContacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-emg-contacts/:id/delete',
        component: EmEmpEmgContactsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpEmgContacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
