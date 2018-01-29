import { BaseEntity } from './../../shared';

export class LeLegalEntities implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idNumber?: string,
        public dutyNumber?: string,
        public address?: string,
        public postalNumber?: string,
        public idEntityType?: BaseEntity,
        public region?: BaseEntity,
    ) {
    }
}
