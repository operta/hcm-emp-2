import { BaseEntity } from './../../shared';

export class EmEmpFamilies implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public middleName?: string,
        public surname?: string,
        public maidenName?: string,
        public identificationNumber?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idFamily?: BaseEntity,
        public idEmployee?: BaseEntity,
    ) {
    }
}
