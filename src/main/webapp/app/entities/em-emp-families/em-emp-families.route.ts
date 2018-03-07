import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpFamiliesComponent } from './em-emp-families.component';
import { EmEmpFamiliesDetailComponent } from './em-emp-families-detail.component';
import { EmEmpFamiliesPopupComponent } from './em-emp-families-dialog.component';
import { EmEmpFamiliesDeletePopupComponent } from './em-emp-families-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpFamiliesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
        [
            {
                path: 'em-emp-families',
                component: EmEmpFamiliesComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpFamilies.home.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'em-emp-families/:id',
                component: EmEmpFamiliesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpFamilies.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }

];

export const emEmpFamiliesPopupRoute: Routes = [
    {
        path: 'em-emp-families-new/:employeeId',
        component: EmEmpFamiliesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpFamilies.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-families/:id/edit',
        component: EmEmpFamiliesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpFamilies.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-families/:id/delete',
        component: EmEmpFamiliesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpFamilies.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
