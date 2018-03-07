import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RgFamilyRolesComponent } from './rg-family-roles.component';
import { RgFamilyRolesDetailComponent } from './rg-family-roles-detail.component';
import { RgFamilyRolesPopupComponent } from './rg-family-roles-dialog.component';
import { RgFamilyRolesDeletePopupComponent } from './rg-family-roles-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const rgFamilyRolesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'rg-family-roles',
                    component: RgFamilyRolesComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.rgFamilyRoles.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'rg-family-roles/:id',
                component: RgFamilyRolesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgFamilyRoles.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgFamilyRolesPopupRoute: Routes = [
    {
        path: 'rg-family-roles-new',
        component: RgFamilyRolesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgFamilyRoles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-family-roles/:id/edit',
        component: RgFamilyRolesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgFamilyRoles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-family-roles/:id/delete',
        component: RgFamilyRolesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgFamilyRoles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
