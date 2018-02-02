import { BaseEntity } from './../../shared';

export class EmEmpDocuments implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public dateCreated?: any,
        public validFrom?: any,
        public validTo?: any,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idDocumentType?: BaseEntity,
        public idDocumentLink?: BaseEntity,
    ) {
    }
}
