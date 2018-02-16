import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import { HcmEmpAdminModule } from '../../admin/admin.module';

import {employeeListPopupRoute} from "./employees-list.route";
import {EmployeesListDialogComponent, EmployeesListPopupComponent} from "./employees-list-dialog.component";
import {EmployeesListPopupService} from "./employees-list-popup.service";

const ENTITY_STATES = [
    ...employeeListPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        HcmEmpAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeesListDialogComponent,
        EmployeesListPopupComponent
    ],
    entryComponents: [
        EmployeesListDialogComponent,
        EmployeesListPopupComponent,
    ],
    providers: [
        EmployeesListPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmployeesListModule {}
