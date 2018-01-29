import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgOrgTypesService,
    OgOrgTypesPopupService,
    OgOrgTypesComponent,
    OgOrgTypesDetailComponent,
    OgOrgTypesDialogComponent,
    OgOrgTypesPopupComponent,
    OgOrgTypesDeletePopupComponent,
    OgOrgTypesDeleteDialogComponent,
    ogOrgTypesRoute,
    ogOrgTypesPopupRoute,
    OgOrgTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ogOrgTypesRoute,
    ...ogOrgTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgOrgTypesComponent,
        OgOrgTypesDetailComponent,
        OgOrgTypesDialogComponent,
        OgOrgTypesDeleteDialogComponent,
        OgOrgTypesPopupComponent,
        OgOrgTypesDeletePopupComponent,
    ],
    entryComponents: [
        OgOrgTypesComponent,
        OgOrgTypesDialogComponent,
        OgOrgTypesPopupComponent,
        OgOrgTypesDeleteDialogComponent,
        OgOrgTypesDeletePopupComponent,
    ],
    providers: [
        OgOrgTypesService,
        OgOrgTypesPopupService,
        OgOrgTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgOrgTypesModule {}
