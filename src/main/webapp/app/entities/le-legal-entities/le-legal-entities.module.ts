import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    LeLegalEntitiesService,
    LeLegalEntitiesPopupService,
    LeLegalEntitiesComponent,
    LeLegalEntitiesDetailComponent,
    LeLegalEntitiesDialogComponent,
    LeLegalEntitiesPopupComponent,
    LeLegalEntitiesDeletePopupComponent,
    LeLegalEntitiesDeleteDialogComponent,
    leLegalEntitiesRoute,
    leLegalEntitiesPopupRoute,
    LeLegalEntitiesResolvePagingParams,
} from './';
import {BusyModule} from "angular2-busy";

const ENTITY_STATES = [
    ...leLegalEntitiesRoute,
    ...leLegalEntitiesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BusyModule
    ],
    declarations: [
        LeLegalEntitiesComponent,
        LeLegalEntitiesDetailComponent,
        LeLegalEntitiesDialogComponent,
        LeLegalEntitiesDeleteDialogComponent,
        LeLegalEntitiesPopupComponent,
        LeLegalEntitiesDeletePopupComponent,
    ],
    entryComponents: [
        LeLegalEntitiesComponent,
        LeLegalEntitiesDialogComponent,
        LeLegalEntitiesPopupComponent,
        LeLegalEntitiesDeleteDialogComponent,
        LeLegalEntitiesDeletePopupComponent,
    ],
    providers: [
        LeLegalEntitiesService,
        LeLegalEntitiesPopupService,
        LeLegalEntitiesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpLeLegalEntitiesModule {}
