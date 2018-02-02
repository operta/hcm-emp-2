import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmployeesComponent } from './em-employees.component';
import { EmEmployeesDetailComponent } from './em-employees-detail.component';
import { EmEmployeesPopupComponent } from './em-employees-dialog.component';
import { EmEmployeesDeletePopupComponent } from './em-employees-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmployeesResolvePagingParams implements Resolve<any> {

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

export const emEmployeesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-employees',
                component: EmEmployeesComponent,
                resolve: {
                    'pagingParams': EmEmployeesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmployees.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-employees/:id',
                component: EmEmployeesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmployees.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmployeesPopupRoute: Routes = [
    {
        path: 'em-employees-new',
        component: EmEmployeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-employees/:id/edit',
        component: EmEmployeesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-employees/:id/delete',
        component: EmEmployeesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
