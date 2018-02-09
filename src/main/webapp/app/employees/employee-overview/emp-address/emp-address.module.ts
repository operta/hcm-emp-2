import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HcmEmpSharedModule} from "../../../shared/shared.module";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";
import {EmpAddressPopupRoute} from "./emp-address.route";
import {EmpAddressDialogComponent, EmpAddressPopupComponent} from "./emp-address-dialog.component";
import {EmpAddressPopupService} from "./emp-address-popup.service";



const ENTITY_STATES = [
    ...EmpAddressPopupRoute
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpAddressDialogComponent,
        EmpAddressPopupComponent
    ],
    entryComponents: [
        EmpAddressDialogComponent,
        EmpAddressPopupComponent,
    ],
    providers: [
        LeLegalEntitiesService,
        EmpAddressPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpAddressModule {}
