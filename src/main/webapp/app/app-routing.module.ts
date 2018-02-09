import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import {DashboardComponent} from "./layouts/dashboard/dashboard.component";
import {registerRoute} from "./shared/auth/register/register.route";
import {UserRouteAccessService} from "./shared/auth/user-route-access-service";
import {JhiMainComponent} from "./layouts/main/main.component";


const LAYOUT_ROUTES = [
    navbarRoute,
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER']
        },
        canActivate: [UserRouteAccessService]
    },
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class HcmEmpAppRoutingModule {}
