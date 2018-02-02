import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-emp-performance',
  templateUrl: './emp-performance.component.html',
  styles: []
})
export class EmpPerformanceComponent implements OnInit {
    @Input() employee;

    constructor() { }

    ngOnInit() {

    }

}
