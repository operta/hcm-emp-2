import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RgQualificationsComponent } from './rg-qualifications.component';
import { RgQualificationsDetailComponent } from './rg-qualifications-detail.component';
import { RgQualificationsPopupComponent } from './rg-qualifications-dialog.component';
import { RgQualificationsDeletePopupComponent } from './rg-qualifications-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class RgQualificationsResolvePagingParams implements Resolve<any> {

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

export const rgQualificationsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'rg-qualifications',
                component: RgQualificationsComponent,
                resolve: {
                    'pagingParams': RgQualificationsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgQualifications.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'rg-qualifications/:id',
                component: RgQualificationsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgQualifications.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgQualificationsPopupRoute: Routes = [
    {
        path: 'rg-qualifications-new',
        component: RgQualificationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgQualifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-qualifications/:id/edit',
        component: RgQualificationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgQualifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-qualifications/:id/delete',
        component: RgQualificationsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgQualifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
