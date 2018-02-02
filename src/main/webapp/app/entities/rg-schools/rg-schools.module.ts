import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgSchoolsService,
    RgSchoolsPopupService,
    RgSchoolsComponent,
    RgSchoolsDetailComponent,
    RgSchoolsDialogComponent,
    RgSchoolsPopupComponent,
    RgSchoolsDeletePopupComponent,
    RgSchoolsDeleteDialogComponent,
    rgSchoolsRoute,
    rgSchoolsPopupRoute,
    RgSchoolsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rgSchoolsRoute,
    ...rgSchoolsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgSchoolsComponent,
        RgSchoolsDetailComponent,
        RgSchoolsDialogComponent,
        RgSchoolsDeleteDialogComponent,
        RgSchoolsPopupComponent,
        RgSchoolsDeletePopupComponent,
    ],
    entryComponents: [
        RgSchoolsComponent,
        RgSchoolsDialogComponent,
        RgSchoolsPopupComponent,
        RgSchoolsDeleteDialogComponent,
        RgSchoolsDeletePopupComponent,
    ],
    providers: [
        RgSchoolsService,
        RgSchoolsPopupService,
        RgSchoolsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgSchoolsModule {}
