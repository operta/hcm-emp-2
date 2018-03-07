import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpIdentificationsService,
    EmEmpIdentificationsPopupService,
    EmEmpIdentificationsComponent,
    EmEmpIdentificationsDetailComponent,
    EmEmpIdentificationsDialogComponent,
    EmEmpIdentificationsPopupComponent,
    EmEmpIdentificationsDeletePopupComponent,
    EmEmpIdentificationsDeleteDialogComponent,
    emEmpIdentificationsRoute,
    emEmpIdentificationsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpIdentificationsRoute,
    ...emEmpIdentificationsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpIdentificationsComponent,
        EmEmpIdentificationsDetailComponent,
        EmEmpIdentificationsDialogComponent,
        EmEmpIdentificationsDeleteDialogComponent,
        EmEmpIdentificationsPopupComponent,
        EmEmpIdentificationsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpIdentificationsComponent,
        EmEmpIdentificationsDialogComponent,
        EmEmpIdentificationsPopupComponent,
        EmEmpIdentificationsDeleteDialogComponent,
        EmEmpIdentificationsDeletePopupComponent,
    ],
    providers: [
        EmEmpIdentificationsService,
        EmEmpIdentificationsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpIdentificationsModule {}
