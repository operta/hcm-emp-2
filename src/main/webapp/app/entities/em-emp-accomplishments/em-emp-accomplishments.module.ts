import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpAccomplishmentsService,
    EmEmpAccomplishmentsPopupService,
    EmEmpAccomplishmentsComponent,
    EmEmpAccomplishmentsDetailComponent,
    EmEmpAccomplishmentsDialogComponent,
    EmEmpAccomplishmentsPopupComponent,
    EmEmpAccomplishmentsDeletePopupComponent,
    EmEmpAccomplishmentsDeleteDialogComponent,
    emEmpAccomplishmentsRoute,
    emEmpAccomplishmentsPopupRoute,
    EmEmpAccomplishmentsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpAccomplishmentsRoute,
    ...emEmpAccomplishmentsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpAccomplishmentsComponent,
        EmEmpAccomplishmentsDetailComponent,
        EmEmpAccomplishmentsDialogComponent,
        EmEmpAccomplishmentsDeleteDialogComponent,
        EmEmpAccomplishmentsPopupComponent,
        EmEmpAccomplishmentsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpAccomplishmentsComponent,
        EmEmpAccomplishmentsDialogComponent,
        EmEmpAccomplishmentsPopupComponent,
        EmEmpAccomplishmentsDeleteDialogComponent,
        EmEmpAccomplishmentsDeletePopupComponent,
    ],
    providers: [
        EmEmpAccomplishmentsService,
        EmEmpAccomplishmentsPopupService,
        EmEmpAccomplishmentsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpAccomplishmentsModule {}
