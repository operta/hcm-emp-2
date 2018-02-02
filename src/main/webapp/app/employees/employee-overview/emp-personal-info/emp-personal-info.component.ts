import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-emp-personal-info',
  templateUrl: './emp-personal-info.component.html',
  styles: []
})
export class EmpPersonalInfoComponent implements OnInit {
    @Input() employee;
    @Input() isEditable;
    constructor() { }

    ngOnInit() {
    }

}
