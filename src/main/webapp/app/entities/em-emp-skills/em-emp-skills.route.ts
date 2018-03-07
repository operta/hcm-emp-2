import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmEmpSkillsComponent } from './em-emp-skills.component';
import { EmEmpSkillsDetailComponent } from './em-emp-skills-detail.component';
import { EmEmpSkillsPopupComponent } from './em-emp-skills-dialog.component';
import { EmEmpSkillsDeletePopupComponent } from './em-emp-skills-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const emEmpSkillsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'em-emp-skills',
                    component: EmEmpSkillsComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'hcmEmpApp.emEmpSkills.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'em-emp-skills/:id',
                component: EmEmpSkillsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.emEmpSkills.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const emEmpSkillsPopupRoute: Routes = [
    {
        path: 'em-emp-skills-new/:employeeId',
        component: EmEmpSkillsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-skills/:id/edit',
        component: EmEmpSkillsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'em-emp-skills/:id/delete',
        component: EmEmpSkillsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmpSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
