import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpEmgContactsService,
    EmEmpEmgContactsPopupService,
    EmEmpEmgContactsComponent,
    EmEmpEmgContactsDetailComponent,
    EmEmpEmgContactsDialogComponent,
    EmEmpEmgContactsPopupComponent,
    EmEmpEmgContactsDeletePopupComponent,
    EmEmpEmgContactsDeleteDialogComponent,
    emEmpEmgContactsRoute,
    emEmpEmgContactsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpEmgContactsRoute,
    ...emEmpEmgContactsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpEmgContactsComponent,
        EmEmpEmgContactsDetailComponent,
        EmEmpEmgContactsDialogComponent,
        EmEmpEmgContactsDeleteDialogComponent,
        EmEmpEmgContactsPopupComponent,
        EmEmpEmgContactsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpEmgContactsComponent,
        EmEmpEmgContactsDialogComponent,
        EmEmpEmgContactsPopupComponent,
        EmEmpEmgContactsDeleteDialogComponent,
        EmEmpEmgContactsDeletePopupComponent,
    ],
    providers: [
        EmEmpEmgContactsService,
        EmEmpEmgContactsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpEmgContactsModule {}
