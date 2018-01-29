import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RgRegionsComponent } from './rg-regions.component';
import { RgRegionsDetailComponent } from './rg-regions-detail.component';
import { RgRegionsPopupComponent } from './rg-regions-dialog.component';
import { RgRegionsDeletePopupComponent } from './rg-regions-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class RgRegionsResolvePagingParams implements Resolve<any> {

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

export const rgRegionsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: 'rg-regions',
                component: RgRegionsComponent,
                resolve: {
                    'pagingParams': RgRegionsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgRegions.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'rg-regions/:id',
                component: RgRegionsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgRegions.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgRegionsPopupRoute: Routes = [
    {
        path: 'rg-regions-new',
        component: RgRegionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgRegions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-regions/:id/edit',
        component: RgRegionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgRegions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-regions/:id/delete',
        component: RgRegionsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgRegions.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
