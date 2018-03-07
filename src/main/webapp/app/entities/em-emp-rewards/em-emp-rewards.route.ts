import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpRewardsComponent } from './em-emp-rewards.component';
import { EmEmpRewardsDetailComponent } from './em-emp-rewards-detail.component';
import { EmEmpRewardsPopupComponent } from './em-emp-rewards-dialog.component';
import { EmEmpRewardsDeletePopupComponent } from './em-emp-rewards-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpRewardsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-emp-rewards',
                    component: EmEmpRewardsComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'hcmEmpApp.emEmpRewards.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-emp-rewards/:id',
                component: EmEmpRewardsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpRewards.home.title'
                },
                canActivate: [UserRouteAccessService]
            }
            ]
    }
];

export const emEmpRewardsPopupRoute: Routes = [
    {
        path: 'em-emp-rewards-new/:employeeId',
        component: EmEmpRewardsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-rewards/:id/edit',
        component: EmEmpRewardsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-rewards/:id/delete',
        component: EmEmpRewardsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpRewards.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
