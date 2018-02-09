import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {Subscription} from "rxjs/Subscription";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";

@Component({
  selector: 'jhi-emp-address',
  templateUrl: './emp-address.component.html',
  styles: []
})
export class EmpAddressComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    eventSubscriber: Subscription;
    address: string;
    city: string;
    state: string;
    country: string;
    region: string;
    model: any;
    legalEntityId: number;


  constructor(private legalEntityService: LeLegalEntitiesService,
              private eventManager: JhiEventManager) { }

  ngOnInit() {
      this.legalEntityId = this.employee.idLegalEntity.id;
      this.address = this.employee.idLegalEntity.address;
      this.setRegions(this.employee.idLegalEntity.region);
      this.registerChangeInAddress()
  }

  registerChangeInAddress() {
    this.eventSubscriber = this.eventManager.subscribe('AddressModification', (response) =>   {
        this.legalEntityService.find(this.legalEntityId).subscribe((item) => {
            this.address = item.address;
            this.setRegions(item.region);
        });
    });
  }

  ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
  }

  setRegions(cityRegion: any) {
        if(cityRegion) {
            this.city = cityRegion.name;
            if(cityRegion.idParent) {
                this.state = cityRegion.idParent.name;
                if(cityRegion.idParent.idParent) {
                    this.country = cityRegion.idParent.idParent.name;
                    if(cityRegion.idParent.idParent.idParent) {
                        this.region = cityRegion.idParent.idParent.idParent.name
                    }
                }
            }
        }
    }

}
