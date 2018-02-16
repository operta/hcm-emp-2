import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeLegalEntitiesComponent } from './le-legal-entities.component';
import { LeLegalEntitiesDetailComponent } from './le-legal-entities-detail.component';
import { LeLegalEntitiesPopupComponent } from './le-legal-entities-dialog.component';
import { LeLegalEntitiesDeletePopupComponent } from './le-legal-entities-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class LeLegalEntitiesResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const leLegalEntitiesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'le-legal-entities',
                component: LeLegalEntitiesComponent,
                resolve: {
                    'pagingParams': LeLegalEntitiesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'le-legal-entities/:id',
                component: LeLegalEntitiesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const leLegalEntitiesPopupRoute: Routes = [
    {
        path: 'le-legal-entities-new',
        component: LeLegalEntitiesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entities/:id/edit',
        component: LeLegalEntitiesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entities/:id/delete',
        component: LeLegalEntitiesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.leLegalEntities.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
