import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgContactTypesService,
    RgContactTypesPopupService,
    RgContactTypesComponent,
    RgContactTypesDetailComponent,
    RgContactTypesDialogComponent,
    RgContactTypesPopupComponent,
    RgContactTypesDeletePopupComponent,
    RgContactTypesDeleteDialogComponent,
    rgContactTypesRoute,
    rgContactTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rgContactTypesRoute,
    ...rgContactTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgContactTypesComponent,
        RgContactTypesDetailComponent,
        RgContactTypesDialogComponent,
        RgContactTypesDeleteDialogComponent,
        RgContactTypesPopupComponent,
        RgContactTypesDeletePopupComponent,
    ],
    entryComponents: [
        RgContactTypesComponent,
        RgContactTypesDialogComponent,
        RgContactTypesPopupComponent,
        RgContactTypesDeleteDialogComponent,
        RgContactTypesDeletePopupComponent,
    ],
    providers: [
        RgContactTypesService,
        RgContactTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgContactTypesModule {}
