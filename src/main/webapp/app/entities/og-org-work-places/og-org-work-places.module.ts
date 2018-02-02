import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgOrgWorkPlacesService,
    OgOrgWorkPlacesPopupService,
    OgOrgWorkPlacesComponent,
    OgOrgWorkPlacesDetailComponent,
    OgOrgWorkPlacesDialogComponent,
    OgOrgWorkPlacesPopupComponent,
    OgOrgWorkPlacesDeletePopupComponent,
    OgOrgWorkPlacesDeleteDialogComponent,
    ogOrgWorkPlacesRoute,
    ogOrgWorkPlacesPopupRoute,
    OgOrgWorkPlacesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ogOrgWorkPlacesRoute,
    ...ogOrgWorkPlacesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgOrgWorkPlacesComponent,
        OgOrgWorkPlacesDetailComponent,
        OgOrgWorkPlacesDialogComponent,
        OgOrgWorkPlacesDeleteDialogComponent,
        OgOrgWorkPlacesPopupComponent,
        OgOrgWorkPlacesDeletePopupComponent,
    ],
    entryComponents: [
        OgOrgWorkPlacesComponent,
        OgOrgWorkPlacesDialogComponent,
        OgOrgWorkPlacesPopupComponent,
        OgOrgWorkPlacesDeleteDialogComponent,
        OgOrgWorkPlacesDeletePopupComponent,
    ],
    providers: [
        OgOrgWorkPlacesService,
        OgOrgWorkPlacesPopupService,
        OgOrgWorkPlacesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgOrgWorkPlacesModule {}
