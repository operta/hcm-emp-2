import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgWorkPlaceSkillsService,
    OgWorkPlaceSkillsPopupService,
    OgWorkPlaceSkillsComponent,
    OgWorkPlaceSkillsDetailComponent,
    OgWorkPlaceSkillsDialogComponent,
    OgWorkPlaceSkillsPopupComponent,
    OgWorkPlaceSkillsDeletePopupComponent,
    OgWorkPlaceSkillsDeleteDialogComponent,
    ogWorkPlaceSkillsRoute,
    ogWorkPlaceSkillsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ogWorkPlaceSkillsRoute,
    ...ogWorkPlaceSkillsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgWorkPlaceSkillsComponent,
        OgWorkPlaceSkillsDetailComponent,
        OgWorkPlaceSkillsDialogComponent,
        OgWorkPlaceSkillsDeleteDialogComponent,
        OgWorkPlaceSkillsPopupComponent,
        OgWorkPlaceSkillsDeletePopupComponent,
    ],
    entryComponents: [
        OgWorkPlaceSkillsComponent,
        OgWorkPlaceSkillsDialogComponent,
        OgWorkPlaceSkillsPopupComponent,
        OgWorkPlaceSkillsDeleteDialogComponent,
        OgWorkPlaceSkillsDeletePopupComponent,
    ],
    providers: [
        OgWorkPlaceSkillsService,
        OgWorkPlaceSkillsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgWorkPlaceSkillsModule {}
