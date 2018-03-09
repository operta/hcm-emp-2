import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgWorkPlacesService,
    OgWorkPlacesPopupService,
    OgWorkPlacesComponent,
    OgWorkPlacesDetailComponent,
    OgWorkPlacesDialogComponent,
    OgWorkPlacesPopupComponent,
    OgWorkPlacesDeletePopupComponent,
    OgWorkPlacesDeleteDialogComponent,
    ogWorkPlacesRoute,
    ogWorkPlacesPopupRoute,
    OgWorkPlacesResolvePagingParams,
} from './';
import {HcmEmpOgWorkPlaceSkillsModule} from "../og-work-place-skills/og-work-place-skills.module";
import {ogWorkPlaceSkillsPopupRoute, ogWorkPlaceSkillsRoute} from "../og-work-place-skills/og-work-place-skills.route";
import {OgWorkPlaceSkillsComponent} from "../og-work-place-skills/og-work-place-skills.component";
import {OgWorkPlaceSkillsDetailComponent} from "../og-work-place-skills/og-work-place-skills-detail.component";
import {
    OgWorkPlaceSkillsDialogComponent,
    OgWorkPlaceSkillsPopupComponent
} from "../og-work-place-skills/og-work-place-skills-dialog.component";
import {
    OgWorkPlaceSkillsDeleteDialogComponent,
    OgWorkPlaceSkillsDeletePopupComponent
} from "../og-work-place-skills/og-work-place-skills-delete-dialog.component";
import {OgWorkPlaceSkillsService} from "../og-work-place-skills/og-work-place-skills.service";
import {OgWorkPlaceSkillsPopupService} from "../og-work-place-skills/og-work-place-skills-popup.service";

const ENTITY_STATES = [
    ...ogWorkPlacesRoute,
    ...ogWorkPlacesPopupRoute,
    ...ogWorkPlaceSkillsRoute,
    ...ogWorkPlaceSkillsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        OgWorkPlacesComponent,
        OgWorkPlacesDetailComponent,
        OgWorkPlacesDialogComponent,
        OgWorkPlacesDeleteDialogComponent,
        OgWorkPlacesPopupComponent,
        OgWorkPlacesDeletePopupComponent,
        OgWorkPlaceSkillsComponent,
        OgWorkPlaceSkillsDetailComponent,
        OgWorkPlaceSkillsDialogComponent,
        OgWorkPlaceSkillsDeleteDialogComponent,
        OgWorkPlaceSkillsPopupComponent,
        OgWorkPlaceSkillsDeletePopupComponent,
    ],
    entryComponents: [
        OgWorkPlacesComponent,
        OgWorkPlacesDialogComponent,
        OgWorkPlacesPopupComponent,
        OgWorkPlacesDeleteDialogComponent,
        OgWorkPlacesDeletePopupComponent,
        OgWorkPlaceSkillsComponent,
        OgWorkPlaceSkillsDialogComponent,
        OgWorkPlaceSkillsPopupComponent,
        OgWorkPlaceSkillsDeleteDialogComponent,
        OgWorkPlaceSkillsDeletePopupComponent
    ],
    providers: [
        OgWorkPlacesService,
        OgWorkPlacesPopupService,
        OgWorkPlacesResolvePagingParams,
        OgWorkPlaceSkillsService,
        OgWorkPlaceSkillsPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgWorkPlacesModule {}

