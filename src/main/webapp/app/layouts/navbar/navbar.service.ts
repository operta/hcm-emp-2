

import {Injectable} from "@angular/core";

@Injectable()
export class NavbarService {
    private isEntityCollapsed;
    private isOthersCollapsed;
    private isAdministrationCollapsed;
    private isModulesCollapsed;

    constructor() {
        this.isEntityCollapsed = true;
        this.isAdministrationCollapsed = true;
        this.isOthersCollapsed = true;
        this.isModulesCollapsed = true;
    }

    toggleEntity() {
        this.isEntityCollapsed = !this.isEntityCollapsed;
        if(this.isEntityCollapsed == false){
            this.isAdministrationCollapsed = true;
            this.isOthersCollapsed = true;
            this.isModulesCollapsed = true;
        }
    }

    toggleAdministration() {
        this.isAdministrationCollapsed = !this.isAdministrationCollapsed;
        if(this.isAdministrationCollapsed == false){
            this.isEntityCollapsed = true;
            this.isOthersCollapsed = true;
            this.isModulesCollapsed = true;
        }
    }

    toggleOthers() {
        this.isOthersCollapsed = !this.isOthersCollapsed;
        if(this.isOthersCollapsed == false){
            this.isAdministrationCollapsed = true;
            this.isEntityCollapsed = true;
            this.isModulesCollapsed = true;
        }
    }

    toggleModules() {
        this.isModulesCollapsed = !this.isModulesCollapsed;
        if(this.isModulesCollapsed == false) {
            this.isAdministrationCollapsed = true;
            this.isEntityCollapsed = true;
            this.isOthersCollapsed = true;
        }
    }

    getIsEntityCollapsed() {
        return this.isEntityCollapsed;
    }

    getIsAdministrationCollapsed() {
        return this.isAdministrationCollapsed;
    }

    getIsOthersCollapsed() {
        return this.isOthersCollapsed;
    }

    getIsModulesCollapsed() {
        return this.isModulesCollapsed;
    }

    setIsModulesCollapsed(value) {
        this.isModulesCollapsed = value;
    }

    setIsOthersCollapsed(value) {
        this.isOthersCollapsed = value;
    }

    setIsEntityCollapsed(value) {
        this.isEntityCollapsed = value;
    }

    setIsAdministrationCollapsed(value) {
        this.isAdministrationCollapsed = value;
    }
}
