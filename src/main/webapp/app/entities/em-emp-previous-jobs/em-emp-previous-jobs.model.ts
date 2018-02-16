import { BaseEntity } from './../../shared';

export class EmEmpPreviousJobs implements BaseEntity {
    constructor(
        public id?: number,
        public company?: string,
        public position?: string,
        public dateFrom?: any,
        public dateTo?: any,
        public reasonOfLeaving?: string,
        public managerPosition?: string,
        public lengthOfServiceYears?: number,
        public lengthOfServiceMonths?: number,
        public lengthOfServiceDays?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
    ) {
    }
}
