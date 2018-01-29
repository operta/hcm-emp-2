import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgRegionTypesService,
    RgRegionTypesPopupService,
    RgRegionTypesComponent,
    RgRegionTypesDetailComponent,
    RgRegionTypesDialogComponent,
    RgRegionTypesPopupComponent,
    RgRegionTypesDeletePopupComponent,
    RgRegionTypesDeleteDialogComponent,
    rgRegionTypesRoute,
    rgRegionTypesPopupRoute,
    RgRegionTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rgRegionTypesRoute,
    ...rgRegionTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgRegionTypesComponent,
        RgRegionTypesDetailComponent,
        RgRegionTypesDialogComponent,
        RgRegionTypesDeleteDialogComponent,
        RgRegionTypesPopupComponent,
        RgRegionTypesDeletePopupComponent,
    ],
    entryComponents: [
        RgRegionTypesComponent,
        RgRegionTypesDialogComponent,
        RgRegionTypesPopupComponent,
        RgRegionTypesDeleteDialogComponent,
        RgRegionTypesDeletePopupComponent,
    ],
    providers: [
        RgRegionTypesService,
        RgRegionTypesPopupService,
        RgRegionTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgRegionTypesModule {}
