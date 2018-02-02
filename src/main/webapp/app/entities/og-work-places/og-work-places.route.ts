import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OgWorkPlacesComponent } from './og-work-places.component';
import { OgWorkPlacesDetailComponent } from './og-work-places-detail.component';
import { OgWorkPlacesPopupComponent } from './og-work-places-dialog.component';
import { OgWorkPlacesDeletePopupComponent } from './og-work-places-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class OgWorkPlacesResolvePagingParams implements Resolve<any> {

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

export const ogWorkPlacesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'og-work-places',
                component: OgWorkPlacesComponent,
                resolve: {
                    'pagingParams': OgWorkPlacesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'og-work-places/:id',
                component: OgWorkPlacesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const ogWorkPlacesPopupRoute: Routes = [
    {
        path: 'og-work-places-new',
        component: OgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-places/:id/edit',
        component: OgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-places/:id/delete',
        component: OgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
