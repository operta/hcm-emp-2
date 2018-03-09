/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgContactTypesDialogComponent } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types-dialog.component';
import { RgContactTypesService } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.service';
import { RgContactTypes } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.model';

describe('Component Tests', () => {

    describe('RgContactTypes Management Dialog Component', () => {
        let comp: RgContactTypesDialogComponent;
        let fixture: ComponentFixture<RgContactTypesDialogComponent>;
        let service: RgContactTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgContactTypesDialogComponent],
                providers: [
                    RgContactTypesService
                ]
            })
            .overrideTemplate(RgContactTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgContactTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgContactTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgContactTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgContactTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgContactTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgContactTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgContactTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgContactTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
