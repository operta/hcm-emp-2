import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpDocumentsService,
    EmEmpDocumentsPopupService,
    EmEmpDocumentsComponent,
    EmEmpDocumentsDetailComponent,
    EmEmpDocumentsDialogComponent,
    EmEmpDocumentsPopupComponent,
    EmEmpDocumentsDeletePopupComponent,
    EmEmpDocumentsDeleteDialogComponent,
    emEmpDocumentsRoute,
    emEmpDocumentsPopupRoute,
    EmEmpDocumentsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpDocumentsRoute,
    ...emEmpDocumentsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpDocumentsComponent,
        EmEmpDocumentsDetailComponent,
        EmEmpDocumentsDialogComponent,
        EmEmpDocumentsDeleteDialogComponent,
        EmEmpDocumentsPopupComponent,
        EmEmpDocumentsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpDocumentsComponent,
        EmEmpDocumentsDialogComponent,
        EmEmpDocumentsPopupComponent,
        EmEmpDocumentsDeleteDialogComponent,
        EmEmpDocumentsDeletePopupComponent,
    ],
    providers: [
        EmEmpDocumentsService,
        EmEmpDocumentsPopupService,
        EmEmpDocumentsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpDocumentsModule {}
