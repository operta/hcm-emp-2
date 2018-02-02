import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgOrganizationsComponent } from './og-organizations.component';
import { OgOrganizationsDetailComponent } from './og-organizations-detail.component';
import { OgOrganizationsPopupComponent } from './og-organizations-dialog.component';
import { OgOrganizationsDeletePopupComponent } from './og-organizations-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";
import {Injectable} from "@angular/core";
import {JhiPaginationUtil} from "ng-jhipster";


@Injectable()
export class OgOrganizationsResolvePagingParams implements Resolve<any> {

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

export const ogOrganizationsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
    {
        path: 'og-organizations',
        component: OgOrganizationsComponent,
        resolve: {
            'pagingParams': OgOrganizationsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrganizations.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'og-organizations/:id',
        component: OgOrganizationsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrganizations.home.title'
        },
        canActivate: [UserRouteAccessService]
    }]}
];

export const ogOrganizationsPopupRoute: Routes = [
    {
        path: 'og-organizations-new',
        component: OgOrganizationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrganizations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-organizations/:id/edit',
        component: OgOrganizationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrganizations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-organizations/:id/delete',
        component: OgOrganizationsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.ogOrganizations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
