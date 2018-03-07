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
import { HcmEmpEmEmpBankAccountsModule } from './em-emp-bank-accounts/em-emp-bank-accounts.module';
import { HcmEmpOgWorkPlaceTypesModule } from './og-work-place-types/og-work-place-types.module';
import { HcmEmpOgWorkPlacesModule } from './og-work-places/og-work-places.module';
import { HcmEmpOgOrgWorkPlacesModule } from './og-org-work-places/og-org-work-places.module';
import { HcmEmpEmContractTypesModule } from './em-contract-types/em-contract-types.module';
import { HcmEmpEmEmpOrgWorkPlacesModule } from './em-emp-org-work-places/em-emp-org-work-places.module';
import { HcmEmpEmEmpSalariesModule } from './em-emp-salaries/em-emp-salaries.module';
import { HcmEmpEmEmpSchoolsModule } from './em-emp-schools/em-emp-schools.module';
import { HcmEmpRgSchoolsModule } from './rg-schools/rg-schools.module';
import { HcmEmpAtAccomplishmentTypesModule } from './at-accomplishment-types/at-accomplishment-types.module';
import { HcmEmpEmEmpAccomplishmentsModule } from './em-emp-accomplishments/em-emp-accomplishments.module';
import { HcmEmpDmDocumentLinksModule } from './dm-document-links/dm-document-links.module';
import { HcmEmpDmDocumentTypesModule } from './dm-document-types/dm-document-types.module';
import { HcmEmpEmEmpDocumentsModule } from './em-emp-documents/em-emp-documents.module';
import { HcmEmpEmEmpNotesModule } from './em-emp-notes/em-emp-notes.module';
import {EmpPersonalInfoModule} from "../employees/employee-overview/emp-personal-info/emp-personal-info.module";
import {EmpAddressModule} from "../employees/employee-overview/emp-address/emp-address.module";
import {EmpSsnAndTaxNoModule} from "../employees/employee-overview/emp-ssn-and-tax-no/emp-ssn-and-tax-no.module";
import { HcmEmpEmEmpPreviousJobsModule } from './em-emp-previous-jobs/em-emp-previous-jobs.module';
import {HcmEmpEmployeesListModule} from "../employees/employees-list/employees-list.module";
import { HcmEmpEmBorrowingTypesModule } from './em-borrowing-types/em-borrowing-types.module';
import { HcmEmpEmEmpBorrowingsModule } from './em-emp-borrowings/em-emp-borrowings.module';
import { HcmEmpRgFamilyRolesModule } from './rg-family-roles/rg-family-roles.module';
import { HcmEmpEmEmpFamiliesModule } from './em-emp-families/em-emp-families.module';
import { HcmEmpRgIdentificationTypesModule } from './rg-identification-types/rg-identification-types.module';
import { HcmEmpEmEmpIdentificationsModule } from './em-emp-identifications/em-emp-identifications.module';
import { HcmEmpEmInjuryTypesModule } from './em-injury-types/em-injury-types.module';
import { HcmEmpEmEmpInjuriesModule } from './em-emp-injuries/em-emp-injuries.module';
import { HcmEmpEmRewardTypesModule } from './em-reward-types/em-reward-types.module';
import { HcmEmpEmEmpRewardsModule } from './em-emp-rewards/em-emp-rewards.module';
import { HcmEmpRgSkillsModule } from './rg-skills/rg-skills.module';
import { HcmEmpRgSkillGradesModule } from './rg-skill-grades/rg-skill-grades.module';
import { HcmEmpEmEmpSkillsModule } from './em-emp-skills/em-emp-skills.module';
import { HcmEmpEmPenaltiesModule } from './em-penalties/em-penalties.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HcmEmpEmployeesListModule,
        EmpAddressModule,
        EmpSsnAndTaxNoModule,
        EmpPersonalInfoModule,
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
        HcmEmpEmEmpBankAccountsModule,
        HcmEmpOgWorkPlaceTypesModule,
        HcmEmpOgWorkPlacesModule,
        HcmEmpOgOrgWorkPlacesModule,
        HcmEmpEmContractTypesModule,
        HcmEmpEmEmpOrgWorkPlacesModule,
        HcmEmpEmEmpSalariesModule,
        HcmEmpEmEmpSchoolsModule,
        HcmEmpRgSchoolsModule,
        HcmEmpAtAccomplishmentTypesModule,
        HcmEmpEmEmpAccomplishmentsModule,
        HcmEmpDmDocumentLinksModule,
        HcmEmpDmDocumentTypesModule,
        HcmEmpEmEmpDocumentsModule,
        HcmEmpEmEmpNotesModule,
        HcmEmpEmEmpPreviousJobsModule,
        HcmEmpEmBorrowingTypesModule,
        HcmEmpEmEmpBorrowingsModule,
        HcmEmpRgFamilyRolesModule,
        HcmEmpEmEmpFamiliesModule,
        HcmEmpRgIdentificationTypesModule,
        HcmEmpEmEmpIdentificationsModule,
        HcmEmpEmInjuryTypesModule,
        HcmEmpEmEmpInjuriesModule,
        HcmEmpEmRewardTypesModule,
        HcmEmpEmEmpRewardsModule,
        HcmEmpRgSkillsModule,
        HcmEmpRgSkillGradesModule,
        HcmEmpEmEmpSkillsModule,
        HcmEmpEmPenaltiesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcmEmpEntityModule {}
