/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionsDialogComponent } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions-dialog.component';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.service';
import { RgRegions } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.model';
import { RgRegionTypesService } from '../../../../../../main/webapp/app/entities/rg-region-types';

describe('Component Tests', () => {

    describe('RgRegions Management Dialog Component', () => {
        let comp: RgRegionsDialogComponent;
        let fixture: ComponentFixture<RgRegionsDialogComponent>;
        let service: RgRegionsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionsDialogComponent],
                providers: [
                    RgRegionTypesService,
                    RgRegionsService
                ]
            })
            .overrideTemplate(RgRegionsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgRegions(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgRegions = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgRegionsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgRegions();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgRegions = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgRegionsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
