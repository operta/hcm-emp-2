import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RgSkillGradesComponent } from './rg-skill-grades.component';
import { RgSkillGradesDetailComponent } from './rg-skill-grades-detail.component';
import { RgSkillGradesPopupComponent } from './rg-skill-grades-dialog.component';
import { RgSkillGradesDeletePopupComponent } from './rg-skill-grades-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const rgSkillGradesRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'rg-skill-grades',
                    component: RgSkillGradesComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.rgSkillGrades.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'rg-skill-grades/:id',
                component: RgSkillGradesDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgSkillGrades.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgSkillGradesPopupRoute: Routes = [
    {
        path: 'rg-skill-grades-new',
        component: RgSkillGradesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkillGrades.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-skill-grades/:id/edit',
        component: RgSkillGradesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkillGrades.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-skill-grades/:id/delete',
        component: RgSkillGradesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkillGrades.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
