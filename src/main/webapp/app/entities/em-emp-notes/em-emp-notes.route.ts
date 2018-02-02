import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpNotesComponent } from './em-emp-notes.component';
import { EmEmpNotesDetailComponent } from './em-emp-notes-detail.component';
import { EmEmpNotesPopupComponent } from './em-emp-notes-dialog.component';
import { EmEmpNotesDeletePopupComponent } from './em-emp-notes-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpNotesResolvePagingParams implements Resolve<any> {

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

export const emEmpNotesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-notes',
                component: EmEmpNotesComponent,
                resolve: {
                    'pagingParams': EmEmpNotesResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-notes/:id',
                component: EmEmpNotesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpNotesPopupRoute: Routes = [
    {
        path: 'em-emp-notes-new',
        component: EmEmpNotesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-notes/:id/edit',
        component: EmEmpNotesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-notes/:id/delete',
        component: EmEmpNotesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpNotes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
