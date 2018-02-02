/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSchoolsDialogComponent } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools-dialog.component';
import { RgSchoolsService } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.service';
import { RgSchools } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.model';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions';

describe('Component Tests', () => {

    describe('RgSchools Management Dialog Component', () => {
        let comp: RgSchoolsDialogComponent;
        let fixture: ComponentFixture<RgSchoolsDialogComponent>;
        let service: RgSchoolsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSchoolsDialogComponent],
                providers: [
                    RgRegionsService,
                    RgSchoolsService
                ]
            })
            .overrideTemplate(RgSchoolsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSchoolsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSchoolsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSchools(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgSchools = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSchoolsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSchools();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgSchools = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSchoolsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
