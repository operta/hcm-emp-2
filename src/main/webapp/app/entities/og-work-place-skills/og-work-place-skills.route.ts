import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OgWorkPlaceSkillsComponent } from './og-work-place-skills.component';
import { OgWorkPlaceSkillsDetailComponent } from './og-work-place-skills-detail.component';
import { OgWorkPlaceSkillsPopupComponent } from './og-work-place-skills-dialog.component';
import { OgWorkPlaceSkillsDeletePopupComponent } from './og-work-place-skills-delete-dialog.component';
import {DashboardComponent} from "../../layouts/dashboard/dashboard.component";

export const ogWorkPlaceSkillsRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: 'og-work-place-skills',
                component: OgWorkPlaceSkillsComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaceSkills.home.title'
                },
                canActivate: [UserRouteAccessService]
            }, {
                path: 'og-work-place-skills/:id',
                component: OgWorkPlaceSkillsDetailComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'hcmEmpApp.ogWorkPlaceSkills.home.title'
                },
                canActivate: [UserRouteAccessService]
            }]
    }
];

export const ogWorkPlaceSkillsPopupRoute: Routes = [
    {
        path: 'og-work-place-skills-new/:workplaceId',
        component: OgWorkPlaceSkillsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-skills/:id/edit',
        component: OgWorkPlaceSkillsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'og-work-place-skills/:id/delete',
        component: OgWorkPlaceSkillsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.ogWorkPlaceSkills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
