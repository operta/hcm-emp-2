import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmRewardTypesService,
    EmRewardTypesPopupService,
    EmRewardTypesComponent,
    EmRewardTypesDetailComponent,
    EmRewardTypesDialogComponent,
    EmRewardTypesPopupComponent,
    EmRewardTypesDeletePopupComponent,
    EmRewardTypesDeleteDialogComponent,
    emRewardTypesRoute,
    emRewardTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emRewardTypesRoute,
    ...emRewardTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmRewardTypesComponent,
        EmRewardTypesDetailComponent,
        EmRewardTypesDialogComponent,
        EmRewardTypesDeleteDialogComponent,
        EmRewardTypesPopupComponent,
        EmRewardTypesDeletePopupComponent,
    ],
    entryComponents: [
        EmRewardTypesComponent,
        EmRewardTypesDialogComponent,
        EmRewardTypesPopupComponent,
        EmRewardTypesDeleteDialogComponent,
        EmRewardTypesDeletePopupComponent,
    ],
    providers: [
        EmRewardTypesService,
        EmRewardTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmRewardTypesModule {}
