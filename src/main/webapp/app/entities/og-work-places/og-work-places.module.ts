import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgWorkPlacesService,
    OgWorkPlacesPopupService,
    OgWorkPlacesComponent,
    OgWorkPlacesDetailComponent,
    OgWorkPlacesDialogComponent,
    OgWorkPlacesPopupComponent,
    OgWorkPlacesDeletePopupComponent,
    OgWorkPlacesDeleteDialogComponent,
    ogWorkPlacesRoute,
    ogWorkPlacesPopupRoute,
    OgWorkPlacesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ogWorkPlacesRoute,
    ...ogWorkPlacesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgWorkPlacesComponent,
        OgWorkPlacesDetailComponent,
        OgWorkPlacesDialogComponent,
        OgWorkPlacesDeleteDialogComponent,
        OgWorkPlacesPopupComponent,
        OgWorkPlacesDeletePopupComponent,
    ],
    entryComponents: [
        OgWorkPlacesComponent,
        OgWorkPlacesDialogComponent,
        OgWorkPlacesPopupComponent,
        OgWorkPlacesDeleteDialogComponent,
        OgWorkPlacesDeletePopupComponent,
    ],
    providers: [
        OgWorkPlacesService,
        OgWorkPlacesPopupService,
        OgWorkPlacesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgWorkPlacesModule {}
