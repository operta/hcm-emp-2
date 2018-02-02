import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AtAccomplishmentTypesComponent } from './at-accomplishment-types.component';
import { AtAccomplishmentTypesDetailComponent } from './at-accomplishment-types-detail.component';
import { AtAccomplishmentTypesPopupComponent } from './at-accomplishment-types-dialog.component';
import { AtAccomplishmentTypesDeletePopupComponent } from './at-accomplishment-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class AtAccomplishmentTypesResolvePagingParams implements Resolve<any> {

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

export const atAccomplishmentTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: 'at-accomplishment-types',
                component: AtAccomplishmentTypesComponent,
                resolve: {
                    'pagingParams': AtAccomplishmentTypesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'at-accomplishment-types/:id',
                component: AtAccomplishmentTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const atAccomplishmentTypesPopupRoute: Routes = [
    {
        path: 'at-accomplishment-types-new',
        component: AtAccomplishmentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'at-accomplishment-types/:id/edit',
        component: AtAccomplishmentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'at-accomplishment-types/:id/delete',
        component: AtAccomplishmentTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.atAccomplishmentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
