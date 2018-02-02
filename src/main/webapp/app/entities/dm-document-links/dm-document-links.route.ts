import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DmDocumentLinksComponent } from './dm-document-links.component';
import { DmDocumentLinksDetailComponent } from './dm-document-links-detail.component';
import { DmDocumentLinksPopupComponent } from './dm-document-links-dialog.component';
import { DmDocumentLinksDeletePopupComponent } from './dm-document-links-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class DmDocumentLinksResolvePagingParams implements Resolve<any> {

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

export const dmDocumentLinksRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'dm-document-links',
                component: DmDocumentLinksComponent,
                resolve: {
                    'pagingParams': DmDocumentLinksResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'dm-document-links/:id',
                component: DmDocumentLinksDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const dmDocumentLinksPopupRoute: Routes = [
    {
        path: 'dm-document-links-new',
        component: DmDocumentLinksPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-links/:id/edit',
        component: DmDocumentLinksPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-document-links/:id/delete',
        component: DmDocumentLinksDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.dmDocumentLinks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
