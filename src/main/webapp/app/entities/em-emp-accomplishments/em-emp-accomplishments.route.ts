import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpAccomplishmentsComponent } from './em-emp-accomplishments.component';
import { EmEmpAccomplishmentsDetailComponent } from './em-emp-accomplishments-detail.component';
import { EmEmpAccomplishmentsPopupComponent } from './em-emp-accomplishments-dialog.component';
import { EmEmpAccomplishmentsDeletePopupComponent } from './em-emp-accomplishments-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpAccomplishmentsResolvePagingParams implements Resolve<any> {

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

export const emEmpAccomplishmentsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-accomplishments',
                component: EmEmpAccomplishmentsComponent,
                resolve: {
                    'pagingParams': EmEmpAccomplishmentsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-accomplishments/:id',
                component: EmEmpAccomplishmentsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpAccomplishmentsPopupRoute: Routes = [
    {
        path: 'em-emp-accomplishments-new/:employeeId',
        component: EmEmpAccomplishmentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-accomplishments/:id/edit',
        component: EmEmpAccomplishmentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-accomplishments/:id/delete',
        component: EmEmpAccomplishmentsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpAccomplishments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
