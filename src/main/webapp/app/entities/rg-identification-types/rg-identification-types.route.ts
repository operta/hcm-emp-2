import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RgIdentificationTypesComponent } from './rg-identification-types.component';
import { RgIdentificationTypesDetailComponent } from './rg-identification-types-detail.component';
import { RgIdentificationTypesPopupComponent } from './rg-identification-types-dialog.component';
import { RgIdentificationTypesDeletePopupComponent } from './rg-identification-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const rgIdentificationTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'rg-identification-types',
                    component: RgIdentificationTypesComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'hcmEmpApp.rgIdentificationTypes.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'rg-identification-types/:id',
                component: RgIdentificationTypesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.rgIdentificationTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgIdentificationTypesPopupRoute: Routes = [
    {
        path: 'rg-identification-types-new',
        component: RgIdentificationTypesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgIdentificationTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-identification-types/:id/edit',
        component: RgIdentificationTypesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgIdentificationTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-identification-types/:id/delete',
        component: RgIdentificationTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgIdentificationTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
