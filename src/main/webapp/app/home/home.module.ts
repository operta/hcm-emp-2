import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HcmEmpSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {RegisterComponent} from "../shared/auth/register/register.component";
import {Register} from "../shared/auth/register/register.service";
import {registerRoute} from "../shared/auth/register/register.route";

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild([ HOME_ROUTE, registerRoute ])
    ],
    declarations: [
        HomeComponent,
        RegisterComponent
    ],
    entryComponents: [
    ],
    providers: [
        Register
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpHomeModule {}
