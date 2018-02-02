import { BaseEntity } from './../../shared';

export class RgSchools implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public address?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idCity?: BaseEntity,
        public idCountry?: BaseEntity,
        public idRegion?: BaseEntity,
    ) {
    }
}
