import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgSkillsService,
    RgSkillsPopupService,
    RgSkillsComponent,
    RgSkillsDetailComponent,
    RgSkillsDialogComponent,
    RgSkillsPopupComponent,
    RgSkillsDeletePopupComponent,
    RgSkillsDeleteDialogComponent,
    rgSkillsRoute,
    rgSkillsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rgSkillsRoute,
    ...rgSkillsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgSkillsComponent,
        RgSkillsDetailComponent,
        RgSkillsDialogComponent,
        RgSkillsDeleteDialogComponent,
        RgSkillsPopupComponent,
        RgSkillsDeletePopupComponent,
    ],
    entryComponents: [
        RgSkillsComponent,
        RgSkillsDialogComponent,
        RgSkillsPopupComponent,
        RgSkillsDeleteDialogComponent,
        RgSkillsDeletePopupComponent,
    ],
    providers: [
        RgSkillsService,
        RgSkillsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgSkillsModule {}
