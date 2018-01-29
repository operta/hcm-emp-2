import {AfterViewInit, Component, OnInit } from '@angular/core';
declare  let $:any;
@Component({
  selector: 'jhi-employee-overview',
  templateUrl: './employee-overview.component.html',
  styles: []
})
export class EmployeeOverviewComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      $('#dataScroll').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
  }

}
