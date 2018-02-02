/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { AtAccomplishmentTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types-delete-dialog.component';
import { AtAccomplishmentTypesService } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.service';

describe('Component Tests', () => {

    describe('AtAccomplishmentTypes Management Delete Component', () => {
        let comp: AtAccomplishmentTypesDeleteDialogComponent;
        let fixture: ComponentFixture<AtAccomplishmentTypesDeleteDialogComponent>;
        let service: AtAccomplishmentTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [AtAccomplishmentTypesDeleteDialogComponent],
                providers: [
                    AtAccomplishmentTypesService
                ]
            })
            .overrideTemplate(AtAccomplishmentTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtAccomplishmentTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtAccomplishmentTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
