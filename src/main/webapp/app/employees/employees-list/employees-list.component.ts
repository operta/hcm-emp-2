import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {JhiAlertService, JhiEventManager, JhiParseLinks} from "ng-jhipster";
import {Principal} from "../../shared/auth/principal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITEMS_PER_PAGE} from "../../shared/constants/pagination.constants";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {EmEmpOrgWorkPlacesService} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.service";
import {EmEmpOrgWorkPlaces} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.model";
import {OgOrgWorkPlaces} from "../../entities/og-org-work-places/og-org-work-places.model";
import {OgWorkPlaces} from "../../entities/og-work-places/og-work-places.model";
import {OgOrganizations} from "../../entities/og-organizations/og-organizations.model";

@Component({
  selector: 'jhi-employees-list',
  templateUrl: './employees-list.component.html',
  styles: []
})
export class EmployeesListComponent implements OnInit, OnDestroy {

    currentAccount: any;
    emEmployees: EmEmployees[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces[];

    constructor(
        private emEmployeesService: EmEmployeesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService
) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.emEmpOrgWorkPlacesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpOrgWorkPlaces = res.json;
            },
            (res: ResponseWrapper) => this.onErrorWP(res.json)
        );
        this.emEmployeesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/dashboard/employees'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/dashboard/employees', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();


        console.log(Date.now());
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmployees) {
        return item.id;
    }
    registerChangeInEmEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('emEmployeesListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onErrorWP(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    findWorkPlace(employeeId: number) {
        let orgWorkPlace: OgOrgWorkPlaces = this.emEmpOrgWorkPlaces.filter(x => x.idEmployee.id === employeeId && x.dateTo.getTime() > Date.now())[0].idOrgWorkPlace;
        return orgWorkPlace.idWorkPlace;
    }

    findOrganization(employeeId: number) {
        let orgWorkPlace: OgOrgWorkPlaces = this.emEmpOrgWorkPlaces.filter(x => x.idEmployee.id === employeeId && x.dateTo.getTime() > Date.now())[0].idOrgWorkPlace;
        return orgWorkPlace.idOrganization;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.emEmployees = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
