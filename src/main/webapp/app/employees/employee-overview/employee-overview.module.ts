import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeOverviewComponent} from "./employee-overview.component";
import {EmpPersonalInfoComponent} from "./emp-personal-info/emp-personal-info.component";
import { EmpAddressComponent } from './emp-address/emp-address.component';
import { EmpSsnAndTaxNoComponent } from './emp-ssn-and-tax-no/emp-ssn-and-tax-no.component';
import { EmpBankAccountComponent } from './emp-bank-account/emp-bank-account.component';
import { EmpJobExperienceComponent } from './emp-job-experience/emp-job-experience.component';
import { EmpPayrollChangesComponent } from './emp-payroll-changes/emp-payroll-changes.component';
import { EmpEducationComponent } from './emp-education/emp-education.component';
import { EmpAccomplishmentsComponent } from './emp-accomplishments/emp-accomplishments.component';
import { EmpDocumentsComponent } from './emp-documents/emp-documents.component';
import { EmpNotesComponent } from './emp-notes/emp-notes.component';
import { EmpPerformanceComponent } from './emp-performance/emp-performance.component';
import { EmpTrainingComponent } from './emp-training/emp-training.component';
import { EmpEmergencyContactComponent } from './emp-emergency-contact/emp-emergency-contact.component';
import {EmpPersonalInfoModule} from "./emp-personal-info/emp-personal-info.module";


@NgModule({
  imports: [
    CommonModule,
      EmpPersonalInfoModule
  ],
  declarations: [
      EmployeeOverviewComponent,
      EmpAddressComponent,
      EmpSsnAndTaxNoComponent,
      EmpBankAccountComponent,
      EmpJobExperienceComponent,
      EmpPayrollChangesComponent,
      EmpEducationComponent,
      EmpAccomplishmentsComponent,
      EmpDocumentsComponent,
      EmpNotesComponent,
      EmpPerformanceComponent,
      EmpTrainingComponent,
      EmpEmergencyContactComponent
  ]
})
export class EmployeeOverviewModule { }
