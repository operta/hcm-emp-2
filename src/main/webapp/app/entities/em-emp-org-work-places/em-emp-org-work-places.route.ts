import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpOrgWorkPlacesComponent } from './em-emp-org-work-places.component';
import { EmEmpOrgWorkPlacesDetailComponent } from './em-emp-org-work-places-detail.component';
import { EmEmpOrgWorkPlacesPopupComponent } from './em-emp-org-work-places-dialog.component';
import { EmEmpOrgWorkPlacesDeletePopupComponent } from './em-emp-org-work-places-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpOrgWorkPlacesResolvePagingParams implements Resolve<any> {

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

export const emEmpOrgWorkPlacesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-org-work-places',
                component: EmEmpOrgWorkPlacesComponent,
                resolve: {
                    'pagingParams': EmEmpOrgWorkPlacesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-org-work-places/:id',
                component: EmEmpOrgWorkPlacesDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpOrgWorkPlacesPopupRoute: Routes = [
    // {
    //     path: 'em-emp-org-work-places-new',
    //     component: EmEmpOrgWorkPlacesPopupComponent,
    //     data: {
    //         authorities: ['ROLE_ADMIN'],
    //         pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // },
    {
        path: 'em-emp-org-work-places-new/:employeeId',
        component: EmEmpOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-org-work-places/:id/edit',
        component: EmEmpOrgWorkPlacesPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-org-work-places/:id/delete',
        component: EmEmpOrgWorkPlacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpOrgWorkPlaces.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
