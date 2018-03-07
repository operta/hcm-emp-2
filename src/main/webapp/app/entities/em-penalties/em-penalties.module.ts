import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmPenaltiesService,
    EmPenaltiesPopupService,
    EmPenaltiesComponent,
    EmPenaltiesDetailComponent,
    EmPenaltiesDialogComponent,
    EmPenaltiesPopupComponent,
    EmPenaltiesDeletePopupComponent,
    EmPenaltiesDeleteDialogComponent,
    emPenaltiesRoute,
    emPenaltiesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emPenaltiesRoute,
    ...emPenaltiesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmPenaltiesComponent,
        EmPenaltiesDetailComponent,
        EmPenaltiesDialogComponent,
        EmPenaltiesDeleteDialogComponent,
        EmPenaltiesPopupComponent,
        EmPenaltiesDeletePopupComponent,
    ],
    entryComponents: [
        EmPenaltiesComponent,
        EmPenaltiesDialogComponent,
        EmPenaltiesPopupComponent,
        EmPenaltiesDeleteDialogComponent,
        EmPenaltiesDeletePopupComponent,
    ],
    providers: [
        EmPenaltiesService,
        EmPenaltiesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmPenaltiesModule {}
