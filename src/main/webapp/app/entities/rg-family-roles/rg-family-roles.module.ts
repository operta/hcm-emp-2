import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    RgFamilyRolesService,
    RgFamilyRolesPopupService,
    RgFamilyRolesComponent,
    RgFamilyRolesDetailComponent,
    RgFamilyRolesDialogComponent,
    RgFamilyRolesPopupComponent,
    RgFamilyRolesDeletePopupComponent,
    RgFamilyRolesDeleteDialogComponent,
    rgFamilyRolesRoute,
    rgFamilyRolesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rgFamilyRolesRoute,
    ...rgFamilyRolesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RgFamilyRolesComponent,
        RgFamilyRolesDetailComponent,
        RgFamilyRolesDialogComponent,
        RgFamilyRolesDeleteDialogComponent,
        RgFamilyRolesPopupComponent,
        RgFamilyRolesDeletePopupComponent,
    ],
    entryComponents: [
        RgFamilyRolesComponent,
        RgFamilyRolesDialogComponent,
        RgFamilyRolesPopupComponent,
        RgFamilyRolesDeleteDialogComponent,
        RgFamilyRolesDeletePopupComponent,
    ],
    providers: [
        RgFamilyRolesService,
        RgFamilyRolesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpRgFamilyRolesModule {}
