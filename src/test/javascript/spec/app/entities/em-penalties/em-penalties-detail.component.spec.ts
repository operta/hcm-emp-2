/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmPenaltiesDetailComponent } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties-detail.component';
import { EmPenaltiesService } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.service';
import { EmPenalties } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.model';

describe('Component Tests', () => {

    describe('EmPenalties Management Detail Component', () => {
        let comp: EmPenaltiesDetailComponent;
        let fixture: ComponentFixture<EmPenaltiesDetailComponent>;
        let service: EmPenaltiesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmPenaltiesDetailComponent],
                providers: [
                    EmPenaltiesService
                ]
            })
            .overrideTemplate(EmPenaltiesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmPenaltiesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmPenaltiesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmPenalties(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emPenalties).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
