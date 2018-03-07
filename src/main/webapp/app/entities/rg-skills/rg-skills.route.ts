import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RgSkillsComponent } from './rg-skills.component';
import { RgSkillsDetailComponent } from './rg-skills-detail.component';
import { RgSkillsPopupComponent } from './rg-skills-dialog.component';
import { RgSkillsDeletePopupComponent } from './rg-skills-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const rgSkillsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:
            [
                {
                    path: 'rg-skills',
                    component: RgSkillsComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'hcmEmpApp.rgSkills.home.title'
                    },
                    canActivate: [UserRouteAccessService]
                }, {
                path: 'rg-skills/:id',
                component: RgSkillsDetailComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'hcmEmpApp.rgSkills.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const rgSkillsPopupRoute: Routes = [
    {
        path: 'rg-skills-new',
        component: RgSkillsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-skills/:id/edit',
        component: RgSkillsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rg-skills/:id/delete',
        component: RgSkillsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hcmEmpApp.rgSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
