import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmInjuryTypesComponent } from './em-injury-types.component';
import { EmInjuryTypesDetailComponent } from './em-injury-types-detail.component';
import { EmInjuryTypesPopupComponent } from './em-injury-types-dialog.component';
import { EmInjuryTypesDeletePopupComponent } from './em-injury-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emInjuryTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-injury-types',
                    component: EmInjuryTypesComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.emInjuryTypes.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-injury-types/:id',
                component: EmInjuryTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emInjuryTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emInjuryTypesPopupRoute: Routes = [
    {
        path: 'em-injury-types-new',
        component: EmInjuryTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emInjuryTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-injury-types/:id/edit',
        component: EmInjuryTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emInjuryTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-injury-types/:id/delete',
        component: EmInjuryTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emInjuryTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
