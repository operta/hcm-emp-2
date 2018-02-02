import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EmpPersonalInfoComponent} from "./emp-personal-info.component";
import {EmpPersonalInfoDialogComponent, EmpPersonalInfoPopupComponent} from "./emp-personal-info-dialog.component";
import {EmpPersonalInfoPopupRoute} from "./emp-personal-info.route";
import {HcmEmpSharedModule} from "../../../shared/shared.module";
import {LeLegalEntitiesComponent} from "../../../entities/le-legal-entities/le-legal-entities.component";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";
import {EmpPersonalInfoPopupService} from "./emp-personal-info-popup.service";


const ENTITY_STATES = [
    ...EmpPersonalInfoPopupRoute
];

@NgModule({
    imports: [
        HcmEmpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpPersonalInfoComponent,
        EmpPersonalInfoDialogComponent,
        EmpPersonalInfoPopupComponent
    ],
    entryComponents: [
        EmpPersonalInfoComponent,
        EmpPersonalInfoDialogComponent,
        EmpPersonalInfoPopupComponent,
    ],
    providers: [
        LeLegalEntitiesService,
        EmpPersonalInfoPopupService,
    ],
    exports: [
        EmpPersonalInfoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpPersonalInfoModule {}
