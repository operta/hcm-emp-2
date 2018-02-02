import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmContractTypesService,
    EmContractTypesPopupService,
    EmContractTypesComponent,
    EmContractTypesDetailComponent,
    EmContractTypesDialogComponent,
    EmContractTypesPopupComponent,
    EmContractTypesDeletePopupComponent,
    EmContractTypesDeleteDialogComponent,
    emContractTypesRoute,
    emContractTypesPopupRoute,
    EmContractTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emContractTypesRoute,
    ...emContractTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmContractTypesComponent,
        EmContractTypesDetailComponent,
        EmContractTypesDialogComponent,
        EmContractTypesDeleteDialogComponent,
        EmContractTypesPopupComponent,
        EmContractTypesDeletePopupComponent,
    ],
    entryComponents: [
        EmContractTypesComponent,
        EmContractTypesDialogComponent,
        EmContractTypesPopupComponent,
        EmContractTypesDeleteDialogComponent,
        EmContractTypesDeletePopupComponent,
    ],
    providers: [
        EmContractTypesService,
        EmContractTypesPopupService,
        EmContractTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmContractTypesModule {}
