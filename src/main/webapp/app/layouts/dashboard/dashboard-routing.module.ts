import {Injectable, NgModule} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,RouterModule, RouterStateSnapshot} from '@angular/router';
import {EmployeeDashboardComponent} from "../../employees/employee-dashboard/employee-dashboard.component";
import {DashboardComponent} from "./dashboard.component";
import {EmployeesComponent} from "../../employees/employees.component";
import {EmployeeOverviewComponent} from "../../employees/employee-overview/employee-overview.component";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {Observable} from "rxjs/Observable";
import {Principal} from "../../shared/auth/principal.service";
import {EmEmpOrgWorkPlacesService} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.service";
import {EmEmployees} from "../../entities/em-employees/em-employees.model";

@Injectable()
export class EmployeeResolver implements Resolve<any> {
    constructor(private employeeService: EmEmployeesService,
                private principal: Principal) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
        if(route.params.id){
            return this.employeeService.find(route.params.id)
        }
        else {
            return this.employeeService.findByUser(route.params.userId)
        }

    }
}

// @Injectable()
// export class EmployeeWorkPlaceResolver implements Resolve<any> {
//     constructor(private employeeService: EmEmployeesService,
//                 private employeeWorkPlaceService: EmEmpOrgWorkPlacesService,
//                 private principal: Principal) {}
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
//         if(route.params.id !== null){
//             return this.employeeWorkPlaceService.findLastWorkPlaceForEmployee(route.params.id)
//         }
//         else {
//             this.principal.identity().then((account) => {
//                 this.employeeService.findByUser(account.id).subscribe(
//                     (employee) => {
//                         return this.employeeWorkPlaceService.findLastWorkPlaceForEmployee(employee.id)
//                     }
//                 )
//             })
//         }
//
//     }
// }


const DASHBOARD_ROUTES = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'employee-dashboard' },
        { path: 'employee-dashboard', component: EmployeeDashboardComponent},
        {
            path: 'employee-overview/:id/:userId',
            component: EmployeeOverviewComponent,
            resolve: {
                employee: EmployeeResolver
            }
        },
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
    ],
    providers: [
        EmployeeResolver
    ]
})
export class DashboardRoutingModule {}

