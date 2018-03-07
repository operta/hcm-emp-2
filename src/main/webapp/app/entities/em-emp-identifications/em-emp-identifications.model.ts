import { BaseEntity } from './../../shared';

export class EmEmpIdentifications implements BaseEntity {
    constructor(
        public id?: number,
        public identificationNumber?: string,
        public jurisdiction?: string,
        public validThrough?: any,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idIdentification?: BaseEntity,
        public idRegion?: BaseEntity,
    ) {
    }
}
