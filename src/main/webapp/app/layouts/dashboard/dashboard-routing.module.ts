import {Injectable, NgModule} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Router} from '@angular/router';
import {EmployeeDashboardComponent} from "../../employees/employee-dashboard/employee-dashboard.component";
import {DashboardComponent} from "./dashboard.component";
import {EmployeesComponent} from "../../employees/employees.component";
import {EmployeeOverviewComponent} from "../../employees/employee-overview/employee-overview.component";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {Observable} from "rxjs/Observable";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";
import {EmployeeNewComponent} from "../../employees/employee-overview/employee-new/employee-new.component";
import {EmEmployeesResolvePagingParams} from "../../entities/em-employees/em-employees.route";


@Injectable()
export class EmployeeResolver implements Resolve<any> {
    constructor(private employeeService: EmEmployeesService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
        if(route.params.id) {
            return this.employeeService.find(route.params.id)
                .catch( (error) => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/404']);
                return Observable.of(null);
            });
        }
        else if(route.params.userId) {
            return this.employeeService.findByUser(route.params.userId)
                .catch((error) => {
                    console.log(`Retrieval error: ${error}`);
                    this.router.navigate(['/dashboard/employee-new']);
                    return Observable.of(null);
                });
        }
        else {
            this.router.navigate(["/404"]);
            return Observable.empty();
        }

    }
}

const DASHBOARD_ROUTES = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'employees'
            },
            {
                path: 'employee-dashboard',
                component: EmployeeDashboardComponent,

                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'global.employeeDashboard'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'employee-overview',
                component: EmployeeOverviewComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER'],
                    pageTitle: 'global.employeeOverview'
                },
                canActivate: [UserRouteAccessService],
                resolve: {
                    employee: EmployeeResolver
                }
            },
            {
                path: 'employee-new',
                component: EmployeeNewComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'employees',
                component: EmployeesComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'global.employees'
                },
                canActivate: [UserRouteAccessService],
                resolve: {
                    'pagingParams': EmEmployeesResolvePagingParams
                },
            },
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

