import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpDocumentsComponent } from './em-emp-documents.component';
import { EmEmpDocumentsDetailComponent } from './em-emp-documents-detail.component';
import { EmEmpDocumentsPopupComponent } from './em-emp-documents-dialog.component';
import { EmEmpDocumentsDeletePopupComponent } from './em-emp-documents-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpDocumentsResolvePagingParams implements Resolve<any> {

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

export const emEmpDocumentsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-documents',
                component: EmEmpDocumentsComponent,
                resolve: {
                    'pagingParams': EmEmpDocumentsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-documents/:id',
                component: EmEmpDocumentsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpDocumentsPopupRoute: Routes = [
    {
        path: 'em-emp-documents-new',
        component: EmEmpDocumentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'

        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-documents/:id/edit',
        component: EmEmpDocumentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-documents/:id/delete',
        component: EmEmpDocumentsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
