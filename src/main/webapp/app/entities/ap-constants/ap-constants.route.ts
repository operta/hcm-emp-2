import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ApConstantsComponent } from './ap-constants.component';
import { ApConstantsDetailComponent } from './ap-constants-detail.component';
import { ApConstantsPopupComponent } from './ap-constants-dialog.component';
import { ApConstantsDeletePopupComponent } from './ap-constants-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const apConstantsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'ap-constants',
                component: ApConstantsComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.apConstants.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'ap-constants/:id',
                component: ApConstantsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.apConstants.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const apConstantsPopupRoute: Routes = [
    {
        path: 'ap-constants-new',
        component: ApConstantsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.apConstants.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ap-constants/:id/edit',
        component: ApConstantsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.apConstants.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ap-constants/:id/delete',
        component: ApConstantsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.apConstants.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
