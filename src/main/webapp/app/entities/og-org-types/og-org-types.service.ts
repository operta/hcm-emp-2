import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgOrgTypes } from './og-org-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgOrgTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/og-org-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogOrgTypes: OgOrgTypes): Observable<OgOrgTypes> {
        const copy = this.convert(ogOrgTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogOrgTypes: OgOrgTypes): Observable<OgOrgTypes> {
        const copy = this.convert(ogOrgTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgOrgTypes> {
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
     * Convert a returned JSON object to OgOrgTypes.
     */
    private convertItemFromServer(json: any): OgOrgTypes {
        const entity: OgOrgTypes = Object.assign(new OgOrgTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgOrgTypes to a JSON which can be sent to the server.
     */
    private convert(ogOrgTypes: OgOrgTypes): OgOrgTypes {
        const copy: OgOrgTypes = Object.assign({}, ogOrgTypes);

        copy.createdAt = this.dateUtils.toDate(ogOrgTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogOrgTypes.updatedAt);
        return copy;
    }
}
