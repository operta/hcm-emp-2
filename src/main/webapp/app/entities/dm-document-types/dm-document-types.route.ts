import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DmDocumentTypesComponent } from './dm-document-types.component';
import { DmDocumentTypesDetailComponent } from './dm-document-types-detail.component';
import { DmDocumentTypesPopupComponent } from './dm-document-types-dialog.component';
import { DmDocumentTypesDeletePopupComponent } from './dm-document-types-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class DmDocumentTypesResolvePagingParams implements Resolve<any> {

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

export const dmDocumentTypesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'dm-document-types',
                component: DmDocumentTypesComponent,
                resolve: {
                    'pagingParams': DmDocumentTypesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'dm-document-types/:id',
                component: DmDocumentTypesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const dmDocumentTypesPopupRoute: Routes = [
    {
        path: 'dm-document-types-new',
        component: DmDocumentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-types/:id/edit',
        component: DmDocumentTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-types/:id/delete',
        component: DmDocumentTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
