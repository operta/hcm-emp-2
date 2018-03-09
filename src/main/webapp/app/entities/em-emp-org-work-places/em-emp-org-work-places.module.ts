import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpOrgWorkPlacesService,
    EmEmpOrgWorkPlacesPopupService,
    EmEmpOrgWorkPlacesComponent,
    EmEmpOrgWorkPlacesDetailComponent,
    EmEmpOrgWorkPlacesDialogComponent,
    EmEmpOrgWorkPlacesPopupComponent,
    EmEmpOrgWorkPlacesDeletePopupComponent,
    EmEmpOrgWorkPlacesDeleteDialogComponent,
    emEmpOrgWorkPlacesRoute,
    emEmpOrgWorkPlacesPopupRoute,
    EmEmpOrgWorkPlacesResolvePagingParams,
} from './';
import {BusyModule} from "angular2-busy";

const ENTITY_STATES = [
    ...emEmpOrgWorkPlacesRoute,
    ...emEmpOrgWorkPlacesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BusyModule
    ],
    declarations: [
        EmEmpOrgWorkPlacesComponent,
        EmEmpOrgWorkPlacesDetailComponent,
        EmEmpOrgWorkPlacesDialogComponent,
        EmEmpOrgWorkPlacesDeleteDialogComponent,
        EmEmpOrgWorkPlacesPopupComponent,
        EmEmpOrgWorkPlacesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpOrgWorkPlacesComponent,
        EmEmpOrgWorkPlacesDialogComponent,
        EmEmpOrgWorkPlacesPopupComponent,
        EmEmpOrgWorkPlacesDeleteDialogComponent,
        EmEmpOrgWorkPlacesDeletePopupComponent,
    ],
    providers: [
        EmEmpOrgWorkPlacesService,
        EmEmpOrgWorkPlacesPopupService,
        EmEmpOrgWorkPlacesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpOrgWorkPlacesModule {}
