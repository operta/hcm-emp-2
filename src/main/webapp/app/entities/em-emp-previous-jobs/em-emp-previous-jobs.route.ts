import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpPreviousJobsComponent } from './em-emp-previous-jobs.component';
import { EmEmpPreviousJobsDetailComponent } from './em-emp-previous-jobs-detail.component';
import { EmEmpPreviousJobsPopupComponent } from './em-emp-previous-jobs-dialog.component';
import { EmEmpPreviousJobsDeletePopupComponent } from './em-emp-previous-jobs-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpPreviousJobsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-emp-previous-jobs',
                    component: EmEmpPreviousJobsComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.emEmpPreviousJobs.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-emp-previous-jobs/:id',
                component: EmEmpPreviousJobsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpPreviousJobs.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpPreviousJobsPopupRoute: Routes = [
    {
        path: 'em-emp-previous-jobs-new/:employeeId',
        component: EmEmpPreviousJobsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpPreviousJobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-previous-jobs/:id/edit',
        component: EmEmpPreviousJobsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpPreviousJobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-previous-jobs/:id/delete',
        component: EmEmpPreviousJobsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpPreviousJobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
