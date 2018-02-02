import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpSchoolsService,
    EmEmpSchoolsPopupService,
    EmEmpSchoolsComponent,
    EmEmpSchoolsDetailComponent,
    EmEmpSchoolsDialogComponent,
    EmEmpSchoolsPopupComponent,
    EmEmpSchoolsDeletePopupComponent,
    EmEmpSchoolsDeleteDialogComponent,
    emEmpSchoolsRoute,
    emEmpSchoolsPopupRoute,
    EmEmpSchoolsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpSchoolsRoute,
    ...emEmpSchoolsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpSchoolsComponent,
        EmEmpSchoolsDetailComponent,
        EmEmpSchoolsDialogComponent,
        EmEmpSchoolsDeleteDialogComponent,
        EmEmpSchoolsPopupComponent,
        EmEmpSchoolsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpSchoolsComponent,
        EmEmpSchoolsDialogComponent,
        EmEmpSchoolsPopupComponent,
        EmEmpSchoolsDeleteDialogComponent,
        EmEmpSchoolsDeletePopupComponent,
    ],
    providers: [
        EmEmpSchoolsService,
        EmEmpSchoolsPopupService,
        EmEmpSchoolsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpSchoolsModule {}
