import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';
import {NavbarService} from "./navbar.service";
declare let $:any;
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.css'
    ]
})
export class NavbarComponent implements OnInit, AfterViewInit {
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

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private navbarService: NavbarService
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
            });
        }
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
