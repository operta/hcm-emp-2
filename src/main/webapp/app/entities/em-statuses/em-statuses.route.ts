import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmStatusesComponent } from './em-statuses.component';
import { EmStatusesDetailComponent } from './em-statuses-detail.component';
import { EmStatusesPopupComponent } from './em-statuses-dialog.component';
import { EmStatusesDeletePopupComponent } from './em-statuses-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmStatusesResolvePagingParams implements Resolve<any> {

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

export const emStatusesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-statuses',
                component: EmStatusesComponent,
                resolve: {
                    'pagingParams': EmStatusesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emStatuses.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-statuses/:id',
                component: EmStatusesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emStatuses.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emStatusesPopupRoute: Routes = [
    {
        path: 'em-statuses-new',
        component: EmStatusesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-statuses/:id/edit',
        component: EmStatusesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-statuses/:id/delete',
        component: EmStatusesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emStatuses.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
