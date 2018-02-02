import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpSchoolsComponent } from './em-emp-schools.component';
import { EmEmpSchoolsDetailComponent } from './em-emp-schools-detail.component';
import { EmEmpSchoolsPopupComponent } from './em-emp-schools-dialog.component';
import { EmEmpSchoolsDeletePopupComponent } from './em-emp-schools-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpSchoolsResolvePagingParams implements Resolve<any> {

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

export const emEmpSchoolsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-schools',
                component: EmEmpSchoolsComponent,
                resolve: {
                    'pagingParams': EmEmpSchoolsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-schools/:id',
                component: EmEmpSchoolsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpSchoolsPopupRoute: Routes = [
    {
        path: 'em-emp-schools-new',
        component: EmEmpSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-schools/:id/edit',
        component: EmEmpSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-schools/:id/delete',
        component: EmEmpSchoolsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
