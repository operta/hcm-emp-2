import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpTypesService,
    EmEmpTypesPopupService,
    EmEmpTypesComponent,
    EmEmpTypesDetailComponent,
    EmEmpTypesDialogComponent,
    EmEmpTypesPopupComponent,
    EmEmpTypesDeletePopupComponent,
    EmEmpTypesDeleteDialogComponent,
    emEmpTypesRoute,
    emEmpTypesPopupRoute,
    EmEmpTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpTypesRoute,
    ...emEmpTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpTypesComponent,
        EmEmpTypesDetailComponent,
        EmEmpTypesDialogComponent,
        EmEmpTypesDeleteDialogComponent,
        EmEmpTypesPopupComponent,
        EmEmpTypesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpTypesComponent,
        EmEmpTypesDialogComponent,
        EmEmpTypesPopupComponent,
        EmEmpTypesDeleteDialogComponent,
        EmEmpTypesDeletePopupComponent,
    ],
    providers: [
        EmEmpTypesService,
        EmEmpTypesPopupService,
        EmEmpTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpTypesModule {}
