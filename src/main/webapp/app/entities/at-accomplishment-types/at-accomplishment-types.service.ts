import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AtAccomplishmentTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/at-accomplishment-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(atAccomplishmentTypes: AtAccomplishmentTypes): Observable<AtAccomplishmentTypes> {
        const copy = this.convert(atAccomplishmentTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(atAccomplishmentTypes: AtAccomplishmentTypes): Observable<AtAccomplishmentTypes> {
        const copy = this.convert(atAccomplishmentTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AtAccomplishmentTypes> {
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
     * Convert a returned JSON object to AtAccomplishmentTypes.
     */
    private convertItemFromServer(json: any): AtAccomplishmentTypes {
        const entity: AtAccomplishmentTypes = Object.assign(new AtAccomplishmentTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a AtAccomplishmentTypes to a JSON which can be sent to the server.
     */
    private convert(atAccomplishmentTypes: AtAccomplishmentTypes): AtAccomplishmentTypes {
        const copy: AtAccomplishmentTypes = Object.assign({}, atAccomplishmentTypes);

        copy.createdAt = this.dateUtils.toDate(atAccomplishmentTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(atAccomplishmentTypes.updatedAt);
        return copy;
    }
}
