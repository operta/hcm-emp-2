import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RgSchoolsComponent } from './rg-schools.component';
import { RgSchoolsDetailComponent } from './rg-schools-detail.component';
import { RgSchoolsPopupComponent } from './rg-schools-dialog.component';
import { RgSchoolsDeletePopupComponent } from './rg-schools-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class RgSchoolsResolvePagingParams implements Resolve<any> {

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

export const rgSchoolsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'rg-schools',
                component: RgSchoolsComponent,
                resolve: {
                    'pagingParams': RgSchoolsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgSchools.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'rg-schools/:id',
                component: RgSchoolsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgSchools.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgSchoolsPopupRoute: Routes = [
    {
        path: 'rg-schools-new',
        component: RgSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-schools/:id/edit',
        component: RgSchoolsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-schools/:id/delete',
        component: RgSchoolsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSchools.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
