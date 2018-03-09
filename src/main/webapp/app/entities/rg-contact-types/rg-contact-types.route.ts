import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RgContactTypesComponent } from './rg-contact-types.component';
import { RgContactTypesDetailComponent } from './rg-contact-types-detail.component';
import { RgContactTypesPopupComponent } from './rg-contact-types-dialog.component';
import { RgContactTypesDeletePopupComponent } from './rg-contact-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const rgContactTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
        {
            path: 'rg-contact-types',
            component: RgContactTypesComponent,
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'hcmEmpApp.rgContactTypes.home.title'
            },
            canActivate: [UserRouteAccessService]
        }, {
            path: 'rg-contact-types/:id',
            component: RgContactTypesDetailComponent,
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'hcmEmpApp.rgContactTypes.home.title'
            },
            canActivate: [UserRouteAccessService]
        }]
    }
];

export const rgContactTypesPopupRoute: Routes = [
    {
        path: 'rg-contact-types-new',
        component: RgContactTypesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgContactTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-contact-types/:id/edit',
        component: RgContactTypesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgContactTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-contact-types/:id/delete',
        component: RgContactTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.rgContactTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
