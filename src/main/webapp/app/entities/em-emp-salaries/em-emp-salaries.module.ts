import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpSalariesService,
    EmEmpSalariesPopupService,
    EmEmpSalariesComponent,
    EmEmpSalariesDetailComponent,
    EmEmpSalariesDialogComponent,
    EmEmpSalariesPopupComponent,
    EmEmpSalariesDeletePopupComponent,
    EmEmpSalariesDeleteDialogComponent,
    emEmpSalariesRoute,
    emEmpSalariesPopupRoute,
    EmEmpSalariesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpSalariesRoute,
    ...emEmpSalariesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpSalariesComponent,
        EmEmpSalariesDetailComponent,
        EmEmpSalariesDialogComponent,
        EmEmpSalariesDeleteDialogComponent,
        EmEmpSalariesPopupComponent,
        EmEmpSalariesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpSalariesComponent,
        EmEmpSalariesDialogComponent,
        EmEmpSalariesPopupComponent,
        EmEmpSalariesDeleteDialogComponent,
        EmEmpSalariesDeletePopupComponent,
    ],
    providers: [
        EmEmpSalariesService,
        EmEmpSalariesPopupService,
        EmEmpSalariesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpSalariesModule {}
