import { BaseEntity, User } from './../../shared';
import {Timestamp} from "rxjs/Rx";

export class EmEmployees implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public middleName?: string,
        public surname?: string,
        public maidenName?: string,
        public disabilityDegree?: number,
        public ethnicGroup?: string,
        public gender?: string,
        public residentialSituation?: string,
        public maritalStatus?: string,
        public bloodGroup?: string,
        public dateOfBirth?: any,
        public hireDate?: any,
        public ssn?: string,
        public taxNumber?: string,
        public imageBlob?: any,
        public imageBlobContentType?: any,
        public phoneNumber?: string,
        public personalPhoneNumber?: string,
        public email?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idQualification?: BaseEntity,
        public idEmploymentType?: BaseEntity,
        public idLegalEntity?: BaseEntity,
        public idStatus?: BaseEntity,
        public idUser?: User,
    ) {
    }
}
