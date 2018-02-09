import {Routes} from '@angular/router';
import {UserRouteAccessService} from "../../../shared/auth/user-route-access-service";
import {EmpAddressPopupComponent} from "./emp-address-dialog.component";


export const EmpAddressPopupRoute: Routes = [

    {
        path: 'emp-address-new',
        component: EmpAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Address'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'emp-address/:id/edit',
        component: EmpAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Address'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
