import { BaseEntity } from './../../shared';

export class DmDocumentLinks implements BaseEntity {
    constructor(
        public id?: number,
        public documentName?: string,
        public fileName?: string,
        public filePath?: string,
        public uri?: string,
        public documentBlobContentType?: string,
        public documentBlob?: any,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
    ) {
    }
}
