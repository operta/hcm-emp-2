import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgSkillGradesService,
    RgSkillGradesPopupService,
    RgSkillGradesComponent,
    RgSkillGradesDetailComponent,
    RgSkillGradesDialogComponent,
    RgSkillGradesPopupComponent,
    RgSkillGradesDeletePopupComponent,
    RgSkillGradesDeleteDialogComponent,
    rgSkillGradesRoute,
    rgSkillGradesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rgSkillGradesRoute,
    ...rgSkillGradesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgSkillGradesComponent,
        RgSkillGradesDetailComponent,
        RgSkillGradesDialogComponent,
        RgSkillGradesDeleteDialogComponent,
        RgSkillGradesPopupComponent,
        RgSkillGradesDeletePopupComponent,
    ],
    entryComponents: [
        RgSkillGradesComponent,
        RgSkillGradesDialogComponent,
        RgSkillGradesPopupComponent,
        RgSkillGradesDeleteDialogComponent,
        RgSkillGradesDeletePopupComponent,
    ],
    providers: [
        RgSkillGradesService,
        RgSkillGradesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgSkillGradesModule {}
