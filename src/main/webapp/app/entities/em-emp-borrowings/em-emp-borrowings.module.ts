import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpBorrowingsService,
    EmEmpBorrowingsPopupService,
    EmEmpBorrowingsComponent,
    EmEmpBorrowingsDetailComponent,
    EmEmpBorrowingsDialogComponent,
    EmEmpBorrowingsPopupComponent,
    EmEmpBorrowingsDeletePopupComponent,
    EmEmpBorrowingsDeleteDialogComponent,
    emEmpBorrowingsRoute,
    emEmpBorrowingsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpBorrowingsRoute,
    ...emEmpBorrowingsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpBorrowingsComponent,
        EmEmpBorrowingsDetailComponent,
        EmEmpBorrowingsDialogComponent,
        EmEmpBorrowingsDeleteDialogComponent,
        EmEmpBorrowingsPopupComponent,
        EmEmpBorrowingsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpBorrowingsComponent,
        EmEmpBorrowingsDialogComponent,
        EmEmpBorrowingsPopupComponent,
        EmEmpBorrowingsDeleteDialogComponent,
        EmEmpBorrowingsDeletePopupComponent,
    ],
    providers: [
        EmEmpBorrowingsService,
        EmEmpBorrowingsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpBorrowingsModule {}
