import { BaseEntity } from './../../shared';

export class EmEmpRewards implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public dateReward?: any,
        public amount?: number,
        public rewardedBy?: string,
        public createdBy?: string,
        public createdAt?: any,
        public updatedBy?: string,
        public updatedAt?: any,
        public idEmployee?: BaseEntity,
        public idReward?: BaseEntity,
    ) {
    }
}
