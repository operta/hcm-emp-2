import { BaseEntity } from './../../shared';

export class EmEmpSchools implements BaseEntity {
    constructor(
        public id?: number,
        public dateFrom?: any,
        public dateTo?: any,
        public major?: string,
        public degree?: string,
        public grade?: number,
        public description?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idSchool?: BaseEntity,
        public idEmployee?: BaseEntity,
        public idQualification?: BaseEntity,
    ) {
    }
}
