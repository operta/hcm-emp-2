import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmBorrowingTypesService,
    EmBorrowingTypesPopupService,
    EmBorrowingTypesComponent,
    EmBorrowingTypesDetailComponent,
    EmBorrowingTypesDialogComponent,
    EmBorrowingTypesPopupComponent,
    EmBorrowingTypesDeletePopupComponent,
    EmBorrowingTypesDeleteDialogComponent,
    emBorrowingTypesRoute,
    emBorrowingTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emBorrowingTypesRoute,
    ...emBorrowingTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmBorrowingTypesComponent,
        EmBorrowingTypesDetailComponent,
        EmBorrowingTypesDialogComponent,
        EmBorrowingTypesDeleteDialogComponent,
        EmBorrowingTypesPopupComponent,
        EmBorrowingTypesDeletePopupComponent,
    ],
    entryComponents: [
        EmBorrowingTypesComponent,
        EmBorrowingTypesDialogComponent,
        EmBorrowingTypesPopupComponent,
        EmBorrowingTypesDeleteDialogComponent,
        EmBorrowingTypesDeletePopupComponent,
    ],
    providers: [
        EmBorrowingTypesService,
        EmBorrowingTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmBorrowingTypesModule {}
