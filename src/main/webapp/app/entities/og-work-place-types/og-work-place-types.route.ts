import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OgWorkPlaceTypesComponent } from './og-work-place-types.component';
import { OgWorkPlaceTypesDetailComponent } from './og-work-place-types-detail.component';
import { OgWorkPlaceTypesPopupComponent } from './og-work-place-types-dialog.component';
import { OgWorkPlaceTypesDeletePopupComponent } from './og-work-place-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class OgWorkPlaceTypesResolvePagingParams implements Resolve<any> {

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

export const ogWorkPlaceTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'og-work-place-types',
                component: OgWorkPlaceTypesComponent,
                resolve: {
                    'pagingParams': OgWorkPlaceTypesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'og-work-place-types/:id',
                component: OgWorkPlaceTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const ogWorkPlaceTypesPopupRoute: Routes = [
    {
        path: 'og-work-place-types-new',
        component: OgWorkPlaceTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-types/:id/edit',
        component: OgWorkPlaceTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-types/:id/delete',
        component: OgWorkPlaceTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
