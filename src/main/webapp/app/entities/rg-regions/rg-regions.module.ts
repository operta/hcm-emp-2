import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgRegionsService,
    RgRegionsPopupService,
    RgRegionsComponent,
    RgRegionsDetailComponent,
    RgRegionsDialogComponent,
    RgRegionsPopupComponent,
    RgRegionsDeletePopupComponent,
    RgRegionsDeleteDialogComponent,
    rgRegionsRoute,
    rgRegionsPopupRoute,
    RgRegionsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rgRegionsRoute,
    ...rgRegionsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgRegionsComponent,
        RgRegionsDetailComponent,
        RgRegionsDialogComponent,
        RgRegionsDeleteDialogComponent,
        RgRegionsPopupComponent,
        RgRegionsDeletePopupComponent,
    ],
    entryComponents: [
        RgRegionsComponent,
        RgRegionsDialogComponent,
        RgRegionsPopupComponent,
        RgRegionsDeleteDialogComponent,
        RgRegionsDeletePopupComponent,
    ],
    providers: [
        RgRegionsService,
        RgRegionsPopupService,
        RgRegionsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgRegionsModule {}
