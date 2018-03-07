import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgIdentificationTypesService,
    RgIdentificationTypesPopupService,
    RgIdentificationTypesComponent,
    RgIdentificationTypesDetailComponent,
    RgIdentificationTypesDialogComponent,
    RgIdentificationTypesPopupComponent,
    RgIdentificationTypesDeletePopupComponent,
    RgIdentificationTypesDeleteDialogComponent,
    rgIdentificationTypesRoute,
    rgIdentificationTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rgIdentificationTypesRoute,
    ...rgIdentificationTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgIdentificationTypesComponent,
        RgIdentificationTypesDetailComponent,
        RgIdentificationTypesDialogComponent,
        RgIdentificationTypesDeleteDialogComponent,
        RgIdentificationTypesPopupComponent,
        RgIdentificationTypesDeletePopupComponent,
    ],
    entryComponents: [
        RgIdentificationTypesComponent,
        RgIdentificationTypesDialogComponent,
        RgIdentificationTypesPopupComponent,
        RgIdentificationTypesDeleteDialogComponent,
        RgIdentificationTypesDeletePopupComponent,
    ],
    providers: [
        RgIdentificationTypesService,
        RgIdentificationTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgIdentificationTypesModule {}
