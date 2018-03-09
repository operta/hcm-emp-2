import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgContactTypes } from './rg-contact-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgContactTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-contact-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgContactTypes: RgContactTypes): Observable<RgContactTypes> {
        const copy = this.convert(rgContactTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgContactTypes: RgContactTypes): Observable<RgContactTypes> {
        const copy = this.convert(rgContactTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgContactTypes> {
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
     * Convert a returned JSON object to RgContactTypes.
     */
    private convertItemFromServer(json: any): RgContactTypes {
        const entity: RgContactTypes = Object.assign(new RgContactTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgContactTypes to a JSON which can be sent to the server.
     */
    private convert(rgContactTypes: RgContactTypes): RgContactTypes {
        const copy: RgContactTypes = Object.assign({}, rgContactTypes);

        copy.createdAt = this.dateUtils.toDate(rgContactTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgContactTypes.updatedAt);
        return copy;
    }
}
