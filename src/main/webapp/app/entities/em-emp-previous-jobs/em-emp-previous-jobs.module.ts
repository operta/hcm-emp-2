import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpPreviousJobsService,
    EmEmpPreviousJobsPopupService,
    EmEmpPreviousJobsComponent,
    EmEmpPreviousJobsDetailComponent,
    EmEmpPreviousJobsDialogComponent,
    EmEmpPreviousJobsPopupComponent,
    EmEmpPreviousJobsDeletePopupComponent,
    EmEmpPreviousJobsDeleteDialogComponent,
    emEmpPreviousJobsRoute,
    emEmpPreviousJobsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpPreviousJobsRoute,
    ...emEmpPreviousJobsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpPreviousJobsComponent,
        EmEmpPreviousJobsDetailComponent,
        EmEmpPreviousJobsDialogComponent,
        EmEmpPreviousJobsDeleteDialogComponent,
        EmEmpPreviousJobsPopupComponent,
        EmEmpPreviousJobsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpPreviousJobsComponent,
        EmEmpPreviousJobsDialogComponent,
        EmEmpPreviousJobsPopupComponent,
        EmEmpPreviousJobsDeleteDialogComponent,
        EmEmpPreviousJobsDeletePopupComponent,
    ],
    providers: [
        EmEmpPreviousJobsService,
        EmEmpPreviousJobsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpPreviousJobsModule {}
