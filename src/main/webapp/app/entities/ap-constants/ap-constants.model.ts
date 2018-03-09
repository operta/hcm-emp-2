import { BaseEntity } from './../../shared';

export class ApConstants implements BaseEntity {
    constructor(
        public id?: number,
        public key?: string,
        public value?: string,
    ) {
    }
}
