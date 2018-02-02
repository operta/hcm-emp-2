import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    DmDocumentTypesService,
    DmDocumentTypesPopupService,
    DmDocumentTypesComponent,
    DmDocumentTypesDetailComponent,
    DmDocumentTypesDialogComponent,
    DmDocumentTypesPopupComponent,
    DmDocumentTypesDeletePopupComponent,
    DmDocumentTypesDeleteDialogComponent,
    dmDocumentTypesRoute,
    dmDocumentTypesPopupRoute,
    DmDocumentTypesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dmDocumentTypesRoute,
    ...dmDocumentTypesPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DmDocumentTypesComponent,
        DmDocumentTypesDetailComponent,
        DmDocumentTypesDialogComponent,
        DmDocumentTypesDeleteDialogComponent,
        DmDocumentTypesPopupComponent,
        DmDocumentTypesDeletePopupComponent,
    ],
    entryComponents: [
        DmDocumentTypesComponent,
        DmDocumentTypesDialogComponent,
        DmDocumentTypesPopupComponent,
        DmDocumentTypesDeleteDialogComponent,
        DmDocumentTypesDeletePopupComponent,
    ],
    providers: [
        DmDocumentTypesService,
        DmDocumentTypesPopupService,
        DmDocumentTypesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpDmDocumentTypesModule {}
