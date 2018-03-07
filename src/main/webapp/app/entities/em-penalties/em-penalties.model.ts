import { BaseEntity } from './../../shared';

export class EmPenalties implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public dateFrom?: any,
        public dateTo?: any,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
    ) {
    }
}
