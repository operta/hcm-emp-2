import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';
import {NavbarService} from "./navbar.service";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {DomSanitizer, EventManager} from "@angular/platform-browser";
import {Subscription} from "rxjs/Subscription";
declare let $:any;
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.css'
    ]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sideMenu') sideMenu: ElementRef;
    inProduction: boolean;
    isEntityCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    name: string;
    isAdministrationCollapsed: boolean;
    isOthersCollapsed: boolean;
    isModulesCollapsed: boolean;
    accountId: number;
    employee: any;
    eventSubscriber: Subscription;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private navbarService: NavbarService,
        private employeeService: EmEmployeesService,
        private sanitizer: DomSanitizer,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();
        this.isOthersCollapsed = this.navbarService.getIsOthersCollapsed();
        this.isModulesCollapsed = this.navbarService.getIsModulesCollapsed();
    }

    ngOnInit() {

        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        if (this.isAuthenticated()) {
            this.principal.identity().then((account) => {
                this.name = account.firstName;
                this.accountId = account.id;
                this.loadEmployee()
            });
        }

        this.registerChange()
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadEmployee() {
        this.employeeService.findByUser(this.accountId).subscribe(
            (employee: any) => {
                if (employee) {
                    this.employee = employee;
                }
            },
            (error) => ''
        );
    }

    isActive() {
        return this.router.isActive('/dashboard/employee-new',true) || this.router.isActive('/dashboard/employee-overview', true) ? 'active' : '';
        // router  is an instance of Router, injected in the constructor
        // return this.router.isActive('/url-to-make-body-active') || this.router.isActive('/other-url-to-make-body-active') ? 'col-sm-9' : '';
    }

    registerChange() {
        this.eventSubscriber = this.eventManager.subscribe('profileImageChange', (response) => this.loadEmployee());
    }


    generateImage(employee:any): any{
        const binaryData = [];
        binaryData.push(employee.imageBlob);
        let objectUrl =  URL.createObjectURL(new Blob(binaryData, {type: employee.imageBlobContentType}));
        const dataUrl = 'data:' + employee.imageBlobContentType + ';base64,' + employee.imageBlob;
        objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

        return url;
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


    ngAfterViewInit(){
        $(".preloader").fadeOut();
        ($(this.sideMenu.nativeElement)).metisMenu();
        $('#slimscrollsidebar').slimScroll({
            height: ''
            , position: 'right'
            , color: '#dcdcdc'
            , });
    }

    toggleAdministration() {
        this.navbarService.toggleAdministration();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isOthersCollapsed = this.navbarService.getIsOthersCollapsed();
        this.isModulesCollapsed = this.navbarService.getIsModulesCollapsed();
    }

    toggleEntity() {
        this.navbarService.toggleEntity();
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();
        this.isOthersCollapsed = this.navbarService.getIsOthersCollapsed();
        this.isModulesCollapsed = this.navbarService.getIsModulesCollapsed();
    }

    toggleOthers() {
        this.navbarService.toggleOthers();
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();
        this.isOthersCollapsed = this.navbarService.getIsOthersCollapsed();
        this.isModulesCollapsed = this.navbarService.getIsModulesCollapsed();
    }

    toggleModules() {
        this.navbarService.toggleModules();
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();
        this.isOthersCollapsed = this.navbarService.getIsOthersCollapsed();
        this.isModulesCollapsed = this.navbarService.getIsModulesCollapsed();
    }


    collapseLists() {
        this.isEntityCollapsed = true;
        this.isAdministrationCollapsed = true;
        this.isOthersCollapsed = true;
        this.isModulesCollapsed = true;
        this.navbarService.setIsModulesCollapsed(true);
        this.navbarService.setIsOthersCollapsed(true);
        this.navbarService.setIsEntityCollapsed(true);
        this.navbarService.setIsAdministrationCollapsed(true);
    }


    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseLists();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
