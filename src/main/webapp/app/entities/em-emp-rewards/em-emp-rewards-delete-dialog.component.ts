import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpRewards } from './em-emp-rewards.model';
import { EmEmpRewardsPopupService } from './em-emp-rewards-popup.service';
import { EmEmpRewardsService } from './em-emp-rewards.service';

@Component({
    selector: 'jhi-em-emp-rewards-delete-dialog',
    templateUrl: './em-emp-rewards-delete-dialog.component.html'
})
export class EmEmpRewardsDeleteDialogComponent {

    emEmpRewards: EmEmpRewards;

    constructor(
        private emEmpRewardsService: EmEmpRewardsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpRewardsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpRewardsListModification',
                content: 'Deleted an emEmpRewards'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-rewards-delete-popup',
    template: ''
})
export class EmEmpRewardsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpRewardsPopupService: EmEmpRewardsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpRewardsPopupService
                .open(EmEmpRewardsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
