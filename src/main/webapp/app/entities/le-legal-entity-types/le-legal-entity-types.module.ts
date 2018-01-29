import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    LeLegalEntityTypesService,
    LeLegalEntityTypesPopupService,
    LeLegalEntityTypesComponent,
    LeLegalEntityTypesDetailComponent,
    LeLegalEntityTypesDialogComponent,
    LeLegalEntityTypesPopupComponent,
    LeLegalEntityTypesDeletePopupComponent,
    LeLegalEntityTypesDeleteDialogComponent,
    leLegalEntityTypesRoute,
    leLegalEntityTypesPopupRoute,
    LeLegalEntityTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...leLegalEntityTypesRoute,
    ...leLegalEntityTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeLegalEntityTypesComponent,
        LeLegalEntityTypesDetailComponent,
        LeLegalEntityTypesDialogComponent,
        LeLegalEntityTypesDeleteDialogComponent,
        LeLegalEntityTypesPopupComponent,
        LeLegalEntityTypesDeletePopupComponent,
    ],
    entryComponents: [
        LeLegalEntityTypesComponent,
        LeLegalEntityTypesDialogComponent,
        LeLegalEntityTypesPopupComponent,
        LeLegalEntityTypesDeleteDialogComponent,
        LeLegalEntityTypesDeletePopupComponent,
    ],
    providers: [
        LeLegalEntityTypesService,
        LeLegalEntityTypesPopupService,
        LeLegalEntityTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpLeLegalEntityTypesModule {}
