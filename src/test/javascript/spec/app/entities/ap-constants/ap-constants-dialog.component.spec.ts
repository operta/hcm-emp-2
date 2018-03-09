/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { ApConstantsDialogComponent } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants-dialog.component';
import { ApConstantsService } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.service';
import { ApConstants } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.model';

describe('Component Tests', () => {

    describe('ApConstants Management Dialog Component', () => {
        let comp: ApConstantsDialogComponent;
        let fixture: ComponentFixture<ApConstantsDialogComponent>;
        let service: ApConstantsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [ApConstantsDialogComponent],
                providers: [
                    ApConstantsService
                ]
            })
            .overrideTemplate(ApConstantsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApConstantsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApConstantsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApConstants(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.apConstants = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'apConstantsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApConstants();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.apConstants = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'apConstantsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
