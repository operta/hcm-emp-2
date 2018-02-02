import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-emp-address',
  templateUrl: './emp-address.component.html',
  styles: []
})
export class EmpAddressComponent implements OnInit {
    @Input() employee;
    @Input() isEditable;
    address: string;
    city: string;
    country: string;
    region: string;

  constructor() { }

  ngOnInit() {
      this.address = this.employee.idLegalEntity.address;
      this.city = this.employee.idLegalEntity.region.name;
      console.log(this.employee);
      this.country = this.employee.idLegalEntity.region.idParent.name;
      this.region = this.employee.idLegalEntity.region.idParent.idParent.name;
  }

}
