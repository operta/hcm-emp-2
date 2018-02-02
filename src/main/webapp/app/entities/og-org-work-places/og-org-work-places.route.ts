import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OgOrgWorkPlacesComponent } from './og-org-work-places.component';
import { OgOrgWorkPlacesDetailComponent } from './og-org-work-places-detail.component';
import { OgOrgWorkPlacesPopupComponent } from './og-org-work-places-dialog.component';
import { OgOrgWorkPlacesDeletePopupComponent } from './og-org-work-places-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class OgOrgWorkPlacesResolvePagingParams implements Resolve<any> {

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

export const ogOrgWorkPlacesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'og-org-work-places',
                component: OgOrgWorkPlacesComponent,
                resolve: {
                    'pagingParams': OgOrgWorkPlacesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'og-org-work-places/:id',
                component: OgOrgWorkPlacesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const ogOrgWorkPlacesPopupRoute: Routes = [
    {
        path: 'og-org-work-places-new',
        component: OgOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-work-places/:id/edit',
        component: OgOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-org-work-places/:id/delete',
        component: OgOrgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
