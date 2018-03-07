import { BaseEntity } from './../../shared';

export class RgSkills implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public field?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
    ) {
    }
}
