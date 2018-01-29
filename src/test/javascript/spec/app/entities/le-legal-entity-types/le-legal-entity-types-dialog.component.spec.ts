/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntityTypesDialogComponent } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types-dialog.component';
import { LeLegalEntityTypesService } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.service';
import { LeLegalEntityTypes } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.model';

describe('Component Tests', () => {

    describe('LeLegalEntityTypes Management Dialog Component', () => {
        let comp: LeLegalEntityTypesDialogComponent;
        let fixture: ComponentFixture<LeLegalEntityTypesDialogComponent>;
        let service: LeLegalEntityTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntityTypesDialogComponent],
                providers: [
                    LeLegalEntityTypesService
                ]
            })
            .overrideTemplate(LeLegalEntityTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntityTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntityTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LeLegalEntityTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.leLegalEntityTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leLegalEntityTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LeLegalEntityTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.leLegalEntityTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leLegalEntityTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
