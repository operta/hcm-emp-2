import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmPenaltiesComponent } from './em-penalties.component';
import { EmPenaltiesDetailComponent } from './em-penalties-detail.component';
import { EmPenaltiesPopupComponent } from './em-penalties-dialog.component';
import { EmPenaltiesDeletePopupComponent } from './em-penalties-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emPenaltiesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-penalties',
                    component: EmPenaltiesComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'hcmEmpApp.emPenalties.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-penalties/:id',
                component: EmPenaltiesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emPenalties.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emPenaltiesPopupRoute: Routes = [
    {
        path: 'em-penalties-new/:employeeId',
        component: EmPenaltiesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emPenalties.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-penalties/:id/edit',
        component: EmPenaltiesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emPenalties.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-penalties/:id/delete',
        component: EmPenaltiesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emPenalties.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
