import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LeLegalEntityTypesComponent } from './le-legal-entity-types.component';
import { LeLegalEntityTypesDetailComponent } from './le-legal-entity-types-detail.component';
import { LeLegalEntityTypesPopupComponent } from './le-legal-entity-types-dialog.component';
import { LeLegalEntityTypesDeletePopupComponent } from './le-legal-entity-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class LeLegalEntityTypesResolvePagingParams implements Resolve<any> {

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

export const leLegalEntityTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'le-legal-entity-types',
                component: LeLegalEntityTypesComponent,
                resolve: {
                    'pagingParams': LeLegalEntityTypesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'le-legal-entity-types/:id',
                component: LeLegalEntityTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const leLegalEntityTypesPopupRoute: Routes = [
    {
        path: 'le-legal-entity-types-new',
        component: LeLegalEntityTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entity-types/:id/edit',
        component: LeLegalEntityTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'le-legal-entity-types/:id/delete',
        component: LeLegalEntityTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.leLegalEntityTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
