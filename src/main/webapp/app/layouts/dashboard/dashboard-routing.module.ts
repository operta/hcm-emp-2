import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EmployeeDashboardComponent} from "../../employees/employee-dashboard/employee-dashboard.component";
import {DashboardComponent} from "./dashboard.component";
import {EmployeesComponent} from "../../employees/employees.component";
import {EmployeeOverviewComponent} from "../../employees/employee-overview/employee-overview.component";

const DASHBOARD_ROUTES = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'employee-dashboard' },
        { path: 'employee-dashboard', component: EmployeeDashboardComponent},
        { path: 'employee-overview', component: EmployeeOverviewComponent},
        { path: 'employees', component: EmployeesComponent},
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
