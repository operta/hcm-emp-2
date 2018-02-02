import { BaseEntity } from './../../shared';

export class EmEmpSalaries implements BaseEntity {
    constructor(
        public id?: number,
        public dateFrom?: any,
        public dateTo?: any,
        public salaryAmount?: number,
        public salaryCoefficient?: number,
        public workHistoryCoefficient?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idWorkPlace?: BaseEntity,
        public idContractType?: BaseEntity,
    ) {
    }
}
