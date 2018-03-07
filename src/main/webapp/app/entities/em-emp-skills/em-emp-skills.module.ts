import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpSkillsService,
    EmEmpSkillsPopupService,
    EmEmpSkillsComponent,
    EmEmpSkillsDetailComponent,
    EmEmpSkillsDialogComponent,
    EmEmpSkillsPopupComponent,
    EmEmpSkillsDeletePopupComponent,
    EmEmpSkillsDeleteDialogComponent,
    emEmpSkillsRoute,
    emEmpSkillsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...emEmpSkillsRoute,
    ...emEmpSkillsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpSkillsComponent,
        EmEmpSkillsDetailComponent,
        EmEmpSkillsDialogComponent,
        EmEmpSkillsDeleteDialogComponent,
        EmEmpSkillsPopupComponent,
        EmEmpSkillsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpSkillsComponent,
        EmEmpSkillsDialogComponent,
        EmEmpSkillsPopupComponent,
        EmEmpSkillsDeleteDialogComponent,
        EmEmpSkillsDeletePopupComponent,
    ],
    providers: [
        EmEmpSkillsService,
        EmEmpSkillsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpSkillsModule {}
