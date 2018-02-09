import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EmpSsnAndTaxNoDialogComponent, EmpSsnAndTaxNoPopupComponent} from "./emp-ssn-and-tax-no-dialog.component";
import {EmpSsnAndTaxNoPopupRoute} from "./emp-ssn-and-tax-no.route";
import {HcmEmpSharedModule} from "../../../shared/shared.module";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";
import {EmpSsnAndTaxNoPopupService} from "./emp-ssn-and-tax-no-popup.service";


const ENTITY_STATES = [
    ...EmpSsnAndTaxNoPopupRoute
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpSsnAndTaxNoDialogComponent,
        EmpSsnAndTaxNoPopupComponent
    ],
    entryComponents: [
        EmpSsnAndTaxNoDialogComponent,
        EmpSsnAndTaxNoPopupComponent,
    ],
    providers: [
        LeLegalEntitiesService,
        EmpSsnAndTaxNoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpSsnAndTaxNoModule {}
