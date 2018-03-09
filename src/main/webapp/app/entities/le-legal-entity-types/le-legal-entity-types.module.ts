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
import {BusyModule} from "angular2-busy";
import {RegionFilterService} from "../../shared/region-filter.service";

const ENTITY_STATES = [
    ...leLegalEntityTypesRoute,
    ...leLegalEntityTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BusyModule
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
        RegionFilterService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpLeLegalEntityTypesModule {}
