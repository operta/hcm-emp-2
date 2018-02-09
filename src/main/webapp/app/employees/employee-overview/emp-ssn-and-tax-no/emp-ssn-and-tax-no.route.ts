import {Routes} from '@angular/router';
import {UserRouteAccessService} from "../../../shared/auth/user-route-access-service";
import {EmpSsnAndTaxNoPopupComponent} from "./emp-ssn-and-tax-no-dialog.component";


export const EmpSsnAndTaxNoPopupRoute: Routes = [

    {
        path: 'emp-ssn-and-tax-no-new',
        component: EmpSsnAndTaxNoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SSN and Tax Number'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'emp-ssn-and-tax-no/:id/edit',
        component: EmpSsnAndTaxNoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SSN and Tax Number'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
