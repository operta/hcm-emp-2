import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmRewardTypesComponent } from './em-reward-types.component';
import { EmRewardTypesDetailComponent } from './em-reward-types-detail.component';
import { EmRewardTypesPopupComponent } from './em-reward-types-dialog.component';
import { EmRewardTypesDeletePopupComponent } from './em-reward-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emRewardTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-reward-types',
                    component: EmRewardTypesComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.emRewardTypes.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-reward-types/:id',
                component: EmRewardTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emRewardTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emRewardTypesPopupRoute: Routes = [
    {
        path: 'em-reward-types-new',
        component: EmRewardTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emRewardTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-reward-types/:id/edit',
        component: EmRewardTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emRewardTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-reward-types/:id/delete',
        component: EmRewardTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emRewardTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
