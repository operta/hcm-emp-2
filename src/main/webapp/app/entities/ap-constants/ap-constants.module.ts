import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    ApConstantsService,
    ApConstantsPopupService,
    ApConstantsComponent,
    ApConstantsDetailComponent,
    ApConstantsDialogComponent,
    ApConstantsPopupComponent,
    ApConstantsDeletePopupComponent,
    ApConstantsDeleteDialogComponent,
    apConstantsRoute,
    apConstantsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...apConstantsRoute,
    ...apConstantsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ApConstantsComponent,
        ApConstantsDetailComponent,
        ApConstantsDialogComponent,
        ApConstantsDeleteDialogComponent,
        ApConstantsPopupComponent,
        ApConstantsDeletePopupComponent,
    ],
    entryComponents: [
        ApConstantsComponent,
        ApConstantsDialogComponent,
        ApConstantsPopupComponent,
        ApConstantsDeleteDialogComponent,
        ApConstantsDeletePopupComponent,
    ],
    providers: [
        ApConstantsService,
        ApConstantsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpApConstantsModule {}
