import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgFamilyRoles } from './rg-family-roles.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgFamilyRolesService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-family-roles';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgFamilyRoles: RgFamilyRoles): Observable<RgFamilyRoles> {
        const copy = this.convert(rgFamilyRoles);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgFamilyRoles: RgFamilyRoles): Observable<RgFamilyRoles> {
        const copy = this.convert(rgFamilyRoles);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgFamilyRoles> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to RgFamilyRoles.
     */
    private convertItemFromServer(json: any): RgFamilyRoles {
        const entity: RgFamilyRoles = Object.assign(new RgFamilyRoles(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgFamilyRoles to a JSON which can be sent to the server.
     */
    private convert(rgFamilyRoles: RgFamilyRoles): RgFamilyRoles {
        const copy: RgFamilyRoles = Object.assign({}, rgFamilyRoles);

        copy.createdAt = this.dateUtils.toDate(rgFamilyRoles.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgFamilyRoles.updatedAt);
        return copy;
    }
}
