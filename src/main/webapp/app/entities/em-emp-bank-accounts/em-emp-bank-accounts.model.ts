import { BaseEntity } from './../../shared';

export class EmEmpBankAccounts implements BaseEntity {
    constructor(
        public id?: number,
        public accountNumber?: string,
        public status?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idBank?: BaseEntity,
    ) {
    }
}
