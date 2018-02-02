import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpSalariesComponent } from './em-emp-salaries.component';
import { EmEmpSalariesDetailComponent } from './em-emp-salaries-detail.component';
import { EmEmpSalariesPopupComponent } from './em-emp-salaries-dialog.component';
import { EmEmpSalariesDeletePopupComponent } from './em-emp-salaries-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpSalariesResolvePagingParams implements Resolve<any> {

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

export const emEmpSalariesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-salaries',
                component: EmEmpSalariesComponent,
                resolve: {
                    'pagingParams': EmEmpSalariesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-salaries/:id',
                component: EmEmpSalariesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpSalariesPopupRoute: Routes = [
    {
        path: 'em-emp-salaries-new',
        component: EmEmpSalariesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-salaries/:id/edit',
        component: EmEmpSalariesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-salaries/:id/delete',
        component: EmEmpSalariesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpSalaries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
