import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmployeesComponent } from './em-employees.component';
import { EmEmployeesDetailComponent } from './em-employees-detail.component';
import { EmEmployeesPopupComponent } from './em-employees-dialog.component';
import { EmEmployeesDeletePopupComponent } from './em-employees-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmployeesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-employees',
                component: EmEmployeesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmployees.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-employees/:id',
                component: EmEmployeesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmployees.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmployeesPopupRoute: Routes = [
    {
        path: 'em-employees-new',
        component: EmEmployeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-employees/:id/edit',
        component: EmEmployeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-employees/:id/delete',
        component: EmEmployeesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
