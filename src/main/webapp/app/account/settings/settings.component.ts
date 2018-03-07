import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {JhiDataUtils, JhiLanguageService} from 'ng-jhipster';

import { Principal, AccountService, JhiLanguageHelper } from '../../shared';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    @ViewChild('userImage') userImage: ElementRef;
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    objectUrl: any;
    trustedUrl: any;
    // // imgUrl = '';
    // imgPath = STORAGE_PATH;


    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private dataUtils: JhiDataUtils,
        private sanitizer: DomSanitizer
    ) {
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
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

    generateImage(user:any){
        var binaryData = [];
        binaryData.push(user.imageBlob);
        this.objectUrl =  URL.createObjectURL(new Blob(binaryData, {type: user.imageBlobContentType}));
        var dataUrl = 'data:' + user.imageBlobContentType + ';base64,' + user.imageBlob;
        this.objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
    }


    ngOnInit() {

        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.generateImage(this.settingsAccount);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    save() {
        console.log('in save');
        console.log(this.settingsAccount);
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
                console.log(this.settingsAccount);
                this.generateImage(this.settingsAccount);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            imageBlob: account.imageBlob,
            imageBlobContentType: account.imageBlobContentType
        };
    }

    // onFileChange(fileInput: any) {
    //     if (fileInput.target.files && fileInput.target.files[0]) {
    //         const reader = new FileReader();
    //
    //         reader.onload = ((e) => {
    //             this.settingsAccount.imageUrl = e.target['result'];
    //         });
    //
    //         reader.readAsDataURL(fileInput.target.files[0]);
    //
    //         this.account.saveImage(fileInput.target.files[0]).subscribe((fileName: string) => {
    //
    //             //this.settingsAccount.imageUrl = fileName;
    //             this.save();
    //         });
    //     }
    // }
}
