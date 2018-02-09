import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HcmEmpSharedModule} from "../../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
import {EmployeeDashboardComponent} from "../../employees/employee-dashboard/employee-dashboard.component";
import {EmployeesComponent} from "../../employees/employees.component";
import {EmployeesListComponent} from "../../employees/employees-list/employees-list.component";
import {EmployeeOverviewComponent} from "../../employees/employee-overview/employee-overview.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NavbarService} from "../navbar/navbar.service";
import {EmployeeOverviewModule} from "../../employees/employee-overview/employee-overview.module";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";

@NgModule({
    imports: [
        HcmEmpSharedModule,
        DashboardRoutingModule,
        EmployeeOverviewModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent,
        NavbarComponent,
        EmployeeDashboardComponent,
        EmployeesComponent,
        EmployeesListComponent
    ],
    entryComponents: [
    ],
    providers: [
        NavbarService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
