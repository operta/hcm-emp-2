import { BaseEntity } from './../../shared';

export class OgWorkPlaceSkills implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public dateSkill?: any,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idSkill?: BaseEntity,
        public idGrade?: BaseEntity,
        public idWorkPlace?: BaseEntity,
    ) {
    }
}
