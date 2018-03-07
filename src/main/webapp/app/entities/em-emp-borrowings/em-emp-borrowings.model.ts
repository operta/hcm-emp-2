import { BaseEntity } from './../../shared';

export class EmEmpBorrowings implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public serialNumber?: string,
        public dateFrom?: any,
        public chargedBy?: string,
        public dateTo?: any,
        public dischargedBy?: string,
        public damage?: string,
        public damagedByEmployee?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idBorrowing?: BaseEntity,
    ) {
    }
}
