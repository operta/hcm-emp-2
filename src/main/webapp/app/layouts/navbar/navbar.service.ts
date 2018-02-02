

import {Injectable} from "@angular/core";

@Injectable()
export class NavbarService {
    private isEntityCollapsed;
    private isAdministrationCollapsed;

    constructor() {
        this.isEntityCollapsed = true;
        this.isAdministrationCollapsed = true;
    }

    toggleEntity() {
        this.isEntityCollapsed = !this.isEntityCollapsed;
        if(this.isEntityCollapsed == false){
            this.isAdministrationCollapsed = true;
        }
    }

    toggleAdministration() {
        this.isAdministrationCollapsed = !this.isAdministrationCollapsed;
        if(this.isAdministrationCollapsed == false){
            this.isEntityCollapsed = true;
        }
    }

    getIsEntityCollapsed() {
        return this.isEntityCollapsed;
    }

    getIsAdministrationCollapsed() {
        return this.isAdministrationCollapsed;
    }

    setIsEntityCollapsed(value) {
        this.isEntityCollapsed = value;
    }

    setIsAdministrationCollapsed(value) {
        this.isAdministrationCollapsed = value;
    }
}
