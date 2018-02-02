/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { AtAccomplishmentTypesDialogComponent } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types-dialog.component';
import { AtAccomplishmentTypesService } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.service';
import { AtAccomplishmentTypes } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.model';

describe('Component Tests', () => {

    describe('AtAccomplishmentTypes Management Dialog Component', () => {
        let comp: AtAccomplishmentTypesDialogComponent;
        let fixture: ComponentFixture<AtAccomplishmentTypesDialogComponent>;
        let service: AtAccomplishmentTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [AtAccomplishmentTypesDialogComponent],
                providers: [
                    AtAccomplishmentTypesService
                ]
            })
            .overrideTemplate(AtAccomplishmentTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtAccomplishmentTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtAccomplishmentTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AtAccomplishmentTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.atAccomplishmentTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atAccomplishmentTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AtAccomplishmentTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.atAccomplishmentTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atAccomplishmentTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
