import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmInjuryTypesService,
    EmInjuryTypesPopupService,
    EmInjuryTypesComponent,
    EmInjuryTypesDetailComponent,
    EmInjuryTypesDialogComponent,
    EmInjuryTypesPopupComponent,
    EmInjuryTypesDeletePopupComponent,
    EmInjuryTypesDeleteDialogComponent,
    emInjuryTypesRoute,
    emInjuryTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emInjuryTypesRoute,
    ...emInjuryTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmInjuryTypesComponent,
        EmInjuryTypesDetailComponent,
        EmInjuryTypesDialogComponent,
        EmInjuryTypesDeleteDialogComponent,
        EmInjuryTypesPopupComponent,
        EmInjuryTypesDeletePopupComponent,
    ],
    entryComponents: [
        EmInjuryTypesComponent,
        EmInjuryTypesDialogComponent,
        EmInjuryTypesPopupComponent,
        EmInjuryTypesDeleteDialogComponent,
        EmInjuryTypesDeletePopupComponent,
    ],
    providers: [
        EmInjuryTypesService,
        EmInjuryTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmInjuryTypesModule {}
