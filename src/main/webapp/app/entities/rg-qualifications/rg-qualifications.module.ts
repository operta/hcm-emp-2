import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgQualificationsService,
    RgQualificationsPopupService,
    RgQualificationsComponent,
    RgQualificationsDetailComponent,
    RgQualificationsDialogComponent,
    RgQualificationsPopupComponent,
    RgQualificationsDeletePopupComponent,
    RgQualificationsDeleteDialogComponent,
    rgQualificationsRoute,
    rgQualificationsPopupRoute,
    RgQualificationsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rgQualificationsRoute,
    ...rgQualificationsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgQualificationsComponent,
        RgQualificationsDetailComponent,
        RgQualificationsDialogComponent,
        RgQualificationsDeleteDialogComponent,
        RgQualificationsPopupComponent,
        RgQualificationsDeletePopupComponent,
    ],
    entryComponents: [
        RgQualificationsComponent,
        RgQualificationsDialogComponent,
        RgQualificationsPopupComponent,
        RgQualificationsDeleteDialogComponent,
        RgQualificationsDeletePopupComponent,
    ],
    providers: [
        RgQualificationsService,
        RgQualificationsPopupService,
        RgQualificationsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgQualificationsModule {}
