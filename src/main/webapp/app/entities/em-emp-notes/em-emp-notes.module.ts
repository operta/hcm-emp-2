import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpNotesService,
    EmEmpNotesPopupService,
    EmEmpNotesComponent,
    EmEmpNotesDetailComponent,
    EmEmpNotesDialogComponent,
    EmEmpNotesPopupComponent,
    EmEmpNotesDeletePopupComponent,
    EmEmpNotesDeleteDialogComponent,
    emEmpNotesRoute,
    emEmpNotesPopupRoute,
    EmEmpNotesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpNotesRoute,
    ...emEmpNotesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpNotesComponent,
        EmEmpNotesDetailComponent,
        EmEmpNotesDialogComponent,
        EmEmpNotesDeleteDialogComponent,
        EmEmpNotesPopupComponent,
        EmEmpNotesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpNotesComponent,
        EmEmpNotesDialogComponent,
        EmEmpNotesPopupComponent,
        EmEmpNotesDeleteDialogComponent,
        EmEmpNotesDeletePopupComponent,
    ],
    providers: [
        EmEmpNotesService,
        EmEmpNotesPopupService,
        EmEmpNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpNotesModule {}
