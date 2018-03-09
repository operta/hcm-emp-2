import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { HcmEmpSharedModule, UserRouteAccessService } from './shared';
import { HcmEmpAppRoutingModule} from './app-routing.module';
import { HcmEmpHomeModule } from './home/home.module';
import { HcmEmpAdminModule } from './admin/admin.module';
import { HcmEmpAccountModule } from './account/account.module';
import { HcmEmpEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {DashboardModule} from "./layouts/dashboard/dashboard.module";
import {RegisterComponent} from "./shared/auth/register/register.component";
import {Register} from "./shared/auth/register/register.service";
import {NavbarService} from "./layouts/navbar/navbar.service";
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule,
        HcmEmpAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        HcmEmpSharedModule,
        HcmEmpHomeModule,
        HcmEmpAdminModule,
        HcmEmpAccountModule,
        HcmEmpEntityModule,
        DashboardModule,
        BrowserAnimationsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class HcmEmpAppModule {}
