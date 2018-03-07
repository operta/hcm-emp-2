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
            (employee) => {
                this.employee = employee;
            },
            (error) => console.log(error)
        );
    }

    registerChange() {
        this.eventSubscriber = this.eventManager.subscribe('profileImageChange', (response) => this.loadEmployee());
    }


    generateImage(employee:any): any{
        var binaryData = [];
        binaryData.push(employee.imageBlob);
        let objectUrl =  URL.createObjectURL(new Blob(binaryData, {type: employee.imageBlobContentType}));
        var dataUrl = 'data:' + employee.imageBlobContentType + ';base64,' + employee.imageBlob;
        objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
        let url = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

        return url;
    }

    dataURItoBlob(dataURI) {
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
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

    }

    toggleEntity() {
        this.navbarService.toggleEntity();
        this.isEntityCollapsed = this.navbarService.getIsEntityCollapsed();
        this.isAdministrationCollapsed = this.navbarService.getIsAdministrationCollapsed();

    }

    collapseLists() {
        this.isEntityCollapsed = true;
        this.isAdministrationCollapsed = true;
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
