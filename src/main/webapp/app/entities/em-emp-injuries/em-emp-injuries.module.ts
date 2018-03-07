import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpInjuriesService,
    EmEmpInjuriesPopupService,
    EmEmpInjuriesComponent,
    EmEmpInjuriesDetailComponent,
    EmEmpInjuriesDialogComponent,
    EmEmpInjuriesPopupComponent,
    EmEmpInjuriesDeletePopupComponent,
    EmEmpInjuriesDeleteDialogComponent,
    emEmpInjuriesRoute,
    emEmpInjuriesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpInjuriesRoute,
    ...emEmpInjuriesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpInjuriesComponent,
        EmEmpInjuriesDetailComponent,
        EmEmpInjuriesDialogComponent,
        EmEmpInjuriesDeleteDialogComponent,
        EmEmpInjuriesPopupComponent,
        EmEmpInjuriesDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpInjuriesComponent,
        EmEmpInjuriesDialogComponent,
        EmEmpInjuriesPopupComponent,
        EmEmpInjuriesDeleteDialogComponent,
        EmEmpInjuriesDeletePopupComponent,
    ],
    providers: [
        EmEmpInjuriesService,
        EmEmpInjuriesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpInjuriesModule {}
