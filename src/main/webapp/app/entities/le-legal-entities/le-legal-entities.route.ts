import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LeLegalEntitiesComponent } from './le-legal-entities.component';
import { LeLegalEntitiesDetailComponent } from './le-legal-entities-detail.component';
import { LeLegalEntitiesPopupComponent } from './le-legal-entities-dialog.component';
import { LeLegalEntitiesDeletePopupComponent } from './le-legal-entities-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const leLegalEntitiesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
    {
        path: 'le-legal-entities',
        component: LeLegalEntitiesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'le-legal-entities/:id',
        component: LeLegalEntitiesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService]
    }]}
];

export const leLegalEntitiesPopupRoute: Routes = [
    {
        path: 'le-legal-entities-new',
        component: LeLegalEntitiesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entities/:id/edit',
        component: LeLegalEntitiesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entities/:id/delete',
        component: LeLegalEntitiesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
