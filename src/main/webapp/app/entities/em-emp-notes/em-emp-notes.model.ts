import { BaseEntity } from './../../shared';

export class EmEmpNotes implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public decsription?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
    ) {
    }
}
