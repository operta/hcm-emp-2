import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpInjuriesComponent } from './em-emp-injuries.component';
import { EmEmpInjuriesDetailComponent } from './em-emp-injuries-detail.component';
import { EmEmpInjuriesPopupComponent } from './em-emp-injuries-dialog.component';
import { EmEmpInjuriesDeletePopupComponent } from './em-emp-injuries-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpInjuriesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
        [
            {
                path: 'em-emp-injuries',
                component: EmEmpInjuriesComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpInjuries.home.title'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'em-emp-injuries/:id',
                component: EmEmpInjuriesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpInjuries.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];

export const emEmpInjuriesPopupRoute: Routes = [
    {
        path: 'em-emp-injuries-new/:employeeId',
        component: EmEmpInjuriesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpInjuries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-injuries/:id/edit',
        component: EmEmpInjuriesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpInjuries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-injuries/:id/delete',
        component: EmEmpInjuriesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpInjuries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
