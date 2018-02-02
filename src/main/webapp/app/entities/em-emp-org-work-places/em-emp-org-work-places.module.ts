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

const ENTITY_STATES = [
    ...emEmpOrgWorkPlacesRoute,
    ...emEmpOrgWorkPlacesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
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
