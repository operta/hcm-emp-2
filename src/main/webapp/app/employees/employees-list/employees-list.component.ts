import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from "ng-jhipster";
import {Principal} from "../../shared/auth/principal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITEMS_PER_PAGE} from "../../shared/constants/pagination.constants";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {EmEmpOrgWorkPlacesService} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.service";
import {EmEmpOrgWorkPlaces} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.model";
import {OgOrgWorkPlaces} from "../../entities/og-org-work-places/og-org-work-places.model";
import {OgWorkPlaces} from "../../entities/og-work-places/og-work-places.model";
import {OgOrganizations} from "../../entities/og-organizations/og-organizations.model";
import {LeLegalEntities} from "../../entities/le-legal-entities/le-legal-entities.model";
import {RgRegions} from "../../entities/rg-regions/rg-regions.model";
import {RgQualificationsService} from "../../entities/rg-qualifications/rg-qualifications.service";
import {RgQualifications} from "../../entities/rg-qualifications/rg-qualifications.model";
import {OgOrganizationsService} from "../../entities/og-organizations/og-organizations.service";
import {OgWorkPlacesService} from "../../entities/og-work-places/og-work-places.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'jhi-employees-list',
  templateUrl: './employees-list.component.html',
  styles: []
})
export class EmployeesListComponent implements OnInit, OnDestroy, OnChanges {

    busy: Subscription;
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
    fromDate: string;
    toDate: string;
    name: string;
    surname: string;
    organizationId: string;
    workplaceId: string;
    qualificationId: string;
    qualifications: RgQualifications[];
    workplaces: OgWorkPlaces[];
    organizations: OgOrganizations[];
    toggleAdvSearch = false;
    objectUrl: any;
    trustedUrl: any;
    urlTuple = [];

    constructor(
        private emEmployeesService: EmEmployeesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
        private qualificationsService: RgQualificationsService,
        private organizationsService: OgOrganizationsService,
        private workplacesService: OgWorkPlacesService,
        private dataUtils: JhiDataUtils,
        private sanitizer: DomSanitizer) {
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
       this.loadEmployees();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    loadQualifications() {
        this.qualificationsService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.qualifications = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadWorkplaces() {
        this.workplacesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.workplaces = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadOrganizations() {
        this.organizationsService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.organizations = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadEmployees() {
        this.busy = this.emEmployeesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onSearchChange() {
        this.busy = this.emEmployeesService.querySearch({
            page: this.page - 1,
            size: this.itemsPerPage,
            fromDate: this.fromDate,
            toDate: this.toDate,
            name: this.name,
            surname: this.surname,
            organizationId: this.organizationId,
            workplaceId: this.workplaceId,
            qualificationId: this.qualificationId
        }).subscribe((res) => {
            this.links = this.parseLinks.parse(res.headers.get('link'));
            this.totalItems = + res.headers.get('X-Total-Count');
            this.queryCount = this.totalItems;
            this.emEmployees = res.json;
            this.generateLinks(this.emEmployees);
        });
    }

    ngOnChanges() {
        this.generateLinks(this.emEmployees);
    }

    onClear() {
        this.fromDate = null;
        this.toDate = null;
        this.name = null;
        this.surname = null;
        this.organizationId = null;
        this.workplaceId = null;
        this.qualificationId = null;
        this.onSearchChange()
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
        this.loadWorkplaces();
        this.loadOrganizations();
        this.loadQualifications();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.busy.unsubscribe();
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
        if(this.emEmpOrgWorkPlaces) {
           const employeeWorkPlaces : EmEmpOrgWorkPlaces[] = this.emEmpOrgWorkPlaces.filter((item) => item.idEmployee.id == employeeId);
            if(employeeWorkPlaces.length > 0) {
               const lastOrgWorkPlace: OgOrgWorkPlaces = employeeWorkPlaces[0].idOrgWorkPlace;
               const lastWorkPlace: OgWorkPlaces = lastOrgWorkPlace.idWorkPlace;
               return lastWorkPlace.name;
            }
        }
        return null;
    }

    findOrganization(employeeId: number) {
        if(this.emEmpOrgWorkPlaces) {
            const employeeWorkPlaces : EmEmpOrgWorkPlaces[] = this.emEmpOrgWorkPlaces.filter((item) => item.idEmployee.id == employeeId);
            if(employeeWorkPlaces.length > 0) {
                const lastOrgWorkPlace: OgOrgWorkPlaces = employeeWorkPlaces[0].idOrgWorkPlace;
                const organization: OgOrganizations = lastOrgWorkPlace.idOrganization;
                return organization.name;
            }
        }
        return null;
    }

    findOrganizationLocation(employeeId: number) {
        if(this.emEmpOrgWorkPlaces) {
            const employeeWorkPlaces : EmEmpOrgWorkPlaces[] = this.emEmpOrgWorkPlaces.filter((item) => item.idEmployee.id == employeeId);
            if(employeeWorkPlaces.length > 0) {
                const lastOrgWorkPlace: OgOrgWorkPlaces = employeeWorkPlaces[0].idOrgWorkPlace;
                const organization: OgOrganizations = lastOrgWorkPlace.idOrganization;
                const entity : LeLegalEntities = organization.idLegalEntity;
                const region: RgRegions = entity.region;
                return region.name;
            }
        }
        return null;
    }


    dataURItoBlob(dataURI) {
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const binary = atob(dataURI.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mime});
    }

    generateImage(employee:any): any{
        const binaryData = [];
        binaryData.push(employee.imageBlob);
        this.objectUrl =  URL.createObjectURL(new Blob(binaryData, {type: employee.imageBlobContentType}));
        const dataUrl = 'data:' + employee.imageBlobContentType + ';base64,' + employee.imageBlob;
        this.objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
        return url;
    }


    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.emEmployees = data;
        this.generateLinks(this.emEmployees);
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    generateLinks(employees: EmEmployees[]) {
        if(employees != null){
            for (let i = 0; i< employees.length; i++){
                const item = {
                    empId: employees[i].id,
                    url: this.generateImage(employees[i])
                };
                this.urlTuple.push(item);
            }
        }
    }

    findUrl(id: any){
        return this.urlTuple.find((item) => item.empId == id).url;
    }
}
