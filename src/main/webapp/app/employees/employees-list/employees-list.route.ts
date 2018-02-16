
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import {EmployeesListPopupComponent} from "./employees-list-dialog.component";


export const employeeListPopupRoute: Routes = [
    {
        path: 'employees-list-new',
        component: EmployeesListPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employees-list/:id/edit',
        component: EmployeesListPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'hcmEmpApp.emEmployees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
    // {
    //     path: 'em-employees/:id/delete',
    //     component: EmployeesListDeletePopupComponent,
    //     data: {
    //         authorities: ['ROLE_ADMIN'],
    //         pageTitle: 'hcmEmpApp.emEmployees.home.title'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // }
];
