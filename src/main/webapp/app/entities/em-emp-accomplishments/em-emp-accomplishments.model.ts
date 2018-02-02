import { BaseEntity } from './../../shared';

export class EmEmpAccomplishments implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public organization?: string,
        public location?: string,
        public association?: string,
        public ongoing?: string,
        public link?: string,
        public dateFrom?: any,
        public dateTo?: any,
        public occupation?: string,
        public proficiency?: string,
        public licenceNumber?: string,
        public rating?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idAccomplishmentType?: BaseEntity,
    ) {
    }
}
