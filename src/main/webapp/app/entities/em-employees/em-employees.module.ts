import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import { HcmEmpAdminModule } from '../../admin/admin.module';
import {
    EmEmployeesService,
    EmEmployeesPopupService,
    EmEmployeesComponent,
    EmEmployeesDetailComponent,
    EmEmployeesDialogComponent,
    EmEmployeesPopupComponent,
    EmEmployeesDeletePopupComponent,
    EmEmployeesDeleteDialogComponent,
    emEmployeesRoute,
    emEmployeesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmployeesRoute,
    ...emEmployeesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        HcmEmpAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmployeesComponent,
        EmEmployeesDetailComponent,
        EmEmployeesDialogComponent,
        EmEmployeesDeleteDialogComponent,
        EmEmployeesPopupComponent,
        EmEmployeesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmployeesComponent,
        EmEmployeesDialogComponent,
        EmEmployeesPopupComponent,
        EmEmployeesDeleteDialogComponent,
        EmEmployeesDeletePopupComponent,
    ],
    providers: [
        EmEmployeesService,
        EmEmployeesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmployeesModule {}
