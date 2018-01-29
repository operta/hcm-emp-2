import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import {DashboardComponent} from "./layouts/dashboard/dashboard.component";
import {registerRoute} from "./shared/auth/register/register.route";


const LAYOUT_ROUTES = [
    navbarRoute,
    { path: 'dashboard', component: DashboardComponent },
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
