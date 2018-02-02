import { BaseEntity } from './../../shared';

export class OgOrgWorkPlaces implements BaseEntity {
    constructor(
        public id?: number,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idOrganization?: BaseEntity,
        public idWorkPlace?: BaseEntity,
    ) {
    }
}
