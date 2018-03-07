import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpFamiliesService,
    EmEmpFamiliesPopupService,
    EmEmpFamiliesComponent,
    EmEmpFamiliesDetailComponent,
    EmEmpFamiliesDialogComponent,
    EmEmpFamiliesPopupComponent,
    EmEmpFamiliesDeletePopupComponent,
    EmEmpFamiliesDeleteDialogComponent,
    emEmpFamiliesRoute,
    emEmpFamiliesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpFamiliesRoute,
    ...emEmpFamiliesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpFamiliesComponent,
        EmEmpFamiliesDetailComponent,
        EmEmpFamiliesDialogComponent,
        EmEmpFamiliesDeleteDialogComponent,
        EmEmpFamiliesPopupComponent,
        EmEmpFamiliesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpFamiliesComponent,
        EmEmpFamiliesDialogComponent,
        EmEmpFamiliesPopupComponent,
        EmEmpFamiliesDeleteDialogComponent,
        EmEmpFamiliesDeletePopupComponent,
    ],
    providers: [
        EmEmpFamiliesService,
        EmEmpFamiliesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpFamiliesModule {}
