import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmEmpBankAccountsComponent } from './em-emp-bank-accounts.component';
import { EmEmpBankAccountsDetailComponent } from './em-emp-bank-accounts-detail.component';
import { EmEmpBankAccountsPopupComponent } from './em-emp-bank-accounts-dialog.component';
import { EmEmpBankAccountsDeletePopupComponent } from './em-emp-bank-accounts-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

@Injectable()
export class EmEmpBankAccountsResolvePagingParams implements Resolve<any> {

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

export const emEmpBankAccountsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'em-emp-bank-accounts',
                component: EmEmpBankAccountsComponent,
                resolve: {
                    'pagingParams': EmEmpBankAccountsResolvePagingParams
                },
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'em-emp-bank-accounts/:id',
                component: EmEmpBankAccountsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpBankAccountsPopupRoute: Routes = [
    {
        path: 'em-emp-bank-accounts-new',
        component: EmEmpBankAccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-bank-accounts/:id/edit',
        component: EmEmpBankAccountsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-bank-accounts/:id/delete',
        component: EmEmpBankAccountsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.emEmpBankAccounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
