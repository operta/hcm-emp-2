import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    AtAccomplishmentTypesService,
    AtAccomplishmentTypesPopupService,
    AtAccomplishmentTypesComponent,
    AtAccomplishmentTypesDetailComponent,
    AtAccomplishmentTypesDialogComponent,
    AtAccomplishmentTypesPopupComponent,
    AtAccomplishmentTypesDeletePopupComponent,
    AtAccomplishmentTypesDeleteDialogComponent,
    atAccomplishmentTypesRoute,
    atAccomplishmentTypesPopupRoute,
    AtAccomplishmentTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...atAccomplishmentTypesRoute,
    ...atAccomplishmentTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtAccomplishmentTypesComponent,
        AtAccomplishmentTypesDetailComponent,
        AtAccomplishmentTypesDialogComponent,
        AtAccomplishmentTypesDeleteDialogComponent,
        AtAccomplishmentTypesPopupComponent,
        AtAccomplishmentTypesDeletePopupComponent,
    ],
    entryComponents: [
        AtAccomplishmentTypesComponent,
        AtAccomplishmentTypesDialogComponent,
        AtAccomplishmentTypesPopupComponent,
        AtAccomplishmentTypesDeleteDialogComponent,
        AtAccomplishmentTypesDeletePopupComponent,
    ],
    providers: [
        AtAccomplishmentTypesService,
        AtAccomplishmentTypesPopupService,
        AtAccomplishmentTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpAtAccomplishmentTypesModule {}
