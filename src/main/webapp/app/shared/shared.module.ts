import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    HcmEmpSharedLibsModule,
    HcmEmpSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
} from './';
import {OrderByPipe} from "./orderBy.pipe";
import {SearchPipe} from "./search.pipe";

@NgModule({
    imports: [
        HcmEmpSharedLibsModule,
        HcmEmpSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        OrderByPipe,
        SearchPipe
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        HcmEmpSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        OrderByPipe,
        SearchPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HcmEmpSharedModule {}
