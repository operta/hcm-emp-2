/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmPenaltiesComponent } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.component';
import { EmPenaltiesService } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.service';
import { EmPenalties } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.model';

describe('Component Tests', () => {

    describe('EmPenalties Management Component', () => {
        let comp: EmPenaltiesComponent;
        let fixture: ComponentFixture<EmPenaltiesComponent>;
        let service: EmPenaltiesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmPenaltiesComponent],
                providers: [
                    EmPenaltiesService
                ]
            })
            .overrideTemplate(EmPenaltiesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmPenaltiesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmPenaltiesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmPenalties(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emPenalties[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
