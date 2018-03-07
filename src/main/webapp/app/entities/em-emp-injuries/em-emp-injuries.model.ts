import { BaseEntity } from './../../shared';

export class EmEmpInjuries implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idInjury?: BaseEntity,
    ) {
    }
}
