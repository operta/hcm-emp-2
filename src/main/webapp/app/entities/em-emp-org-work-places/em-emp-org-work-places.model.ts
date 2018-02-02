import { BaseEntity } from './../../shared';

export class EmEmpOrgWorkPlaces implements BaseEntity {
    constructor(
        public id?: number,
        public dateFrom?: any,
        public dateTo?: any,
        public workHistoryCoefficient?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idContractType?: BaseEntity,
        public idOrgWorkPlace?: BaseEntity,
    ) {
    }
}
