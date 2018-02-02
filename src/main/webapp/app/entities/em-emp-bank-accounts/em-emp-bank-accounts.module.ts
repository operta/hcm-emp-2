import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../../shared';
import {
    EmEmpBankAccountsService,
    EmEmpBankAccountsPopupService,
    EmEmpBankAccountsComponent,
    EmEmpBankAccountsDetailComponent,
    EmEmpBankAccountsDialogComponent,
    EmEmpBankAccountsPopupComponent,
    EmEmpBankAccountsDeletePopupComponent,
    EmEmpBankAccountsDeleteDialogComponent,
    emEmpBankAccountsRoute,
    emEmpBankAccountsPopupRoute,
    EmEmpBankAccountsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...emEmpBankAccountsRoute,
    ...emEmpBankAccountsPopupRoute,
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmEmpBankAccountsComponent,
        EmEmpBankAccountsDetailComponent,
        EmEmpBankAccountsDialogComponent,
        EmEmpBankAccountsDeleteDialogComponent,
        EmEmpBankAccountsPopupComponent,
        EmEmpBankAccountsDeletePopupComponent,
    ],
    entryComponents: [
        EmEmpBankAccountsComponent,
        EmEmpBankAccountsDialogComponent,
        EmEmpBankAccountsPopupComponent,
        EmEmpBankAccountsDeleteDialogComponent,
        EmEmpBankAccountsDeletePopupComponent,
    ],
    providers: [
        EmEmpBankAccountsService,
        EmEmpBankAccountsPopupService,
        EmEmpBankAccountsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEmEmpBankAccountsModule {}
