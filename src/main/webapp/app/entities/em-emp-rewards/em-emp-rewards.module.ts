import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpRewardsService,
    EmEmpRewardsPopupService,
    EmEmpRewardsComponent,
    EmEmpRewardsDetailComponent,
    EmEmpRewardsDialogComponent,
    EmEmpRewardsPopupComponent,
    EmEmpRewardsDeletePopupComponent,
    EmEmpRewardsDeleteDialogComponent,
    emEmpRewardsRoute,
    emEmpRewardsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpRewardsRoute,
    ...emEmpRewardsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpRewardsComponent,
        EmEmpRewardsDetailComponent,
        EmEmpRewardsDialogComponent,
        EmEmpRewardsDeleteDialogComponent,
        EmEmpRewardsPopupComponent,
        EmEmpRewardsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpRewardsComponent,
        EmEmpRewardsDialogComponent,
        EmEmpRewardsPopupComponent,
        EmEmpRewardsDeleteDialogComponent,
        EmEmpRewardsDeletePopupComponent,
    ],
    providers: [
        EmEmpRewardsService,
        EmEmpRewardsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpRewardsModule {}
