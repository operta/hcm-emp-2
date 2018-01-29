import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgOrganizations } from './og-organizations.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgOrganizationsService {

    private resourceUrl =  SERVER_API_URL + 'api/og-organizations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogOrganizations: OgOrganizations): Observable<OgOrganizations> {
        const copy = this.convert(ogOrganizations);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogOrganizations: OgOrganizations): Observable<OgOrganizations> {
        const copy = this.convert(ogOrganizations);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgOrganizations> {
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
     * Convert a returned JSON object to OgOrganizations.
     */
    private convertItemFromServer(json: any): OgOrganizations {
        const entity: OgOrganizations = Object.assign(new OgOrganizations(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgOrganizations to a JSON which can be sent to the server.
     */
    private convert(ogOrganizations: OgOrganizations): OgOrganizations {
        const copy: OgOrganizations = Object.assign({}, ogOrganizations);

        copy.createdAt = this.dateUtils.toDate(ogOrganizations.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogOrganizations.updatedAt);
        return copy;
    }
}
