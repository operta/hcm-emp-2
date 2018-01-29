import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    OgOrganizationsService,
    OgOrganizationsPopupService,
    OgOrganizationsComponent,
    OgOrganizationsDetailComponent,
    OgOrganizationsDialogComponent,
    OgOrganizationsPopupComponent,
    OgOrganizationsDeletePopupComponent,
    OgOrganizationsDeleteDialogComponent,
    ogOrganizationsRoute,
    ogOrganizationsPopupRoute,
    OgOrganizationsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ogOrganizationsRoute,
    ...ogOrganizationsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OgOrganizationsComponent,
        OgOrganizationsDetailComponent,
        OgOrganizationsDialogComponent,
        OgOrganizationsDeleteDialogComponent,
        OgOrganizationsPopupComponent,
        OgOrganizationsDeletePopupComponent,
    ],
    entryComponents: [
        OgOrganizationsComponent,
        OgOrganizationsDialogComponent,
        OgOrganizationsPopupComponent,
        OgOrganizationsDeleteDialogComponent,
        OgOrganizationsDeletePopupComponent,
    ],
    providers: [
        OgOrganizationsService,
        OgOrganizationsPopupService,
        OgOrganizationsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpOgOrganizationsModule {}
