import {Routes} from '@angular/router';
import {UserRouteAccessService} from "../../../shared/auth/user-route-access-service";
import {EmpPersonalInfoPopupService} from "./emp-personal-info-popup.service";
import {EmpPersonalInfoPopupComponent} from "./emp-personal-info-dialog.component";


export const EmpPersonalInfoPopupRoute: Routes = [
    {
        path: 'emp-personal-info-new',
        component: EmpPersonalInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personal Information'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'emp-personal-info/:id/edit',
        component: EmpPersonalInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personal Information'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
