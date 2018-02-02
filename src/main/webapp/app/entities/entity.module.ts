import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HcmEmpOgOrganizationsModule } from './og-organizations/og-organizations.module';
import { HcmEmpOgOrgTypesModule } from './og-org-types/og-org-types.module';
import { HcmEmpLeLegalEntitiesModule } from './le-legal-entities/le-legal-entities.module';
import { HcmEmpLeLegalEntityTypesModule } from './le-legal-entity-types/le-legal-entity-types.module';
import { HcmEmpRgRegionsModule } from './rg-regions/rg-regions.module';
import { HcmEmpRgRegionTypesModule } from './rg-region-types/rg-region-types.module';
import { HcmEmpRgQualificationsModule } from './rg-qualifications/rg-qualifications.module';
import { HcmEmpEmEmpTypesModule } from './em-emp-types/em-emp-types.module';
import { HcmEmpEmStatusesModule } from './em-statuses/em-statuses.module';
import { HcmEmpEmEmployeesModule } from './em-employees/em-employees.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HcmEmpOgOrganizationsModule,
        HcmEmpOgOrgTypesModule,
        HcmEmpLeLegalEntitiesModule,
        HcmEmpLeLegalEntityTypesModule,
        HcmEmpRgRegionsModule,
        HcmEmpRgRegionTypesModule,
        HcmEmpRgQualificationsModule,
        HcmEmpEmEmpTypesModule,
        HcmEmpEmStatusesModule,
        HcmEmpEmEmployeesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEntityModule {}
