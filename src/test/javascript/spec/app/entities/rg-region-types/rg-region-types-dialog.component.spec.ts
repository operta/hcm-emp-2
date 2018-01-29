/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionTypesDialogComponent } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types-dialog.component';
import { RgRegionTypesService } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.service';
import { RgRegionTypes } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.model';

describe('Component Tests', () => {

    describe('RgRegionTypes Management Dialog Component', () => {
        let comp: RgRegionTypesDialogComponent;
        let fixture: ComponentFixture<RgRegionTypesDialogComponent>;
        let service: RgRegionTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionTypesDialogComponent],
                providers: [
                    RgRegionTypesService
                ]
            })
            .overrideTemplate(RgRegionTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgRegionTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgRegionTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgRegionTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgRegionTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgRegionTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgRegionTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
