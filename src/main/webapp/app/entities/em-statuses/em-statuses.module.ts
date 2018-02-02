import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmStatusesService,
    EmStatusesPopupService,
    EmStatusesComponent,
    EmStatusesDetailComponent,
    EmStatusesDialogComponent,
    EmStatusesPopupComponent,
    EmStatusesDeletePopupComponent,
    EmStatusesDeleteDialogComponent,
    emStatusesRoute,
    emStatusesPopupRoute,
    EmStatusesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emStatusesRoute,
    ...emStatusesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmStatusesComponent,
        EmStatusesDetailComponent,
        EmStatusesDialogComponent,
        EmStatusesDeleteDialogComponent,
        EmStatusesPopupComponent,
        EmStatusesDeletePopupComponent,
    ],
    entryComponents: [
        EmStatusesComponent,
        EmStatusesDialogComponent,
        EmStatusesPopupComponent,
        EmStatusesDeleteDialogComponent,
        EmStatusesDeletePopupComponent,
    ],
    providers: [
        EmStatusesService,
        EmStatusesPopupService,
        EmStatusesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmStatusesModule {}
