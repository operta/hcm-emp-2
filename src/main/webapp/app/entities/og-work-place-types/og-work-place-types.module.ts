import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgWorkPlaceTypesService,
    OgWorkPlaceTypesPopupService,
    OgWorkPlaceTypesComponent,
    OgWorkPlaceTypesDetailComponent,
    OgWorkPlaceTypesDialogComponent,
    OgWorkPlaceTypesPopupComponent,
    OgWorkPlaceTypesDeletePopupComponent,
    OgWorkPlaceTypesDeleteDialogComponent,
    ogWorkPlaceTypesRoute,
    ogWorkPlaceTypesPopupRoute,
    OgWorkPlaceTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ogWorkPlaceTypesRoute,
    ...ogWorkPlaceTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgWorkPlaceTypesComponent,
        OgWorkPlaceTypesDetailComponent,
        OgWorkPlaceTypesDialogComponent,
        OgWorkPlaceTypesDeleteDialogComponent,
        OgWorkPlaceTypesPopupComponent,
        OgWorkPlaceTypesDeletePopupComponent,
    ],
    entryComponents: [
        OgWorkPlaceTypesComponent,
        OgWorkPlaceTypesDialogComponent,
        OgWorkPlaceTypesPopupComponent,
        OgWorkPlaceTypesDeleteDialogComponent,
        OgWorkPlaceTypesDeletePopupComponent,
    ],
    providers: [
        OgWorkPlaceTypesService,
        OgWorkPlaceTypesPopupService,
        OgWorkPlaceTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgWorkPlaceTypesModule {}
