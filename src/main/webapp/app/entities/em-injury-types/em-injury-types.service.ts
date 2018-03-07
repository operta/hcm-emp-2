import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmInjuryTypes } from './em-injury-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmInjuryTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-injury-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emInjuryTypes: EmInjuryTypes): Observable<EmInjuryTypes> {
        const copy = this.convert(emInjuryTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emInjuryTypes: EmInjuryTypes): Observable<EmInjuryTypes> {
        const copy = this.convert(emInjuryTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmInjuryTypes> {
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
     * Convert a returned JSON object to EmInjuryTypes.
     */
    private convertItemFromServer(json: any): EmInjuryTypes {
        const entity: EmInjuryTypes = Object.assign(new EmInjuryTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmInjuryTypes to a JSON which can be sent to the server.
     */
    private convert(emInjuryTypes: EmInjuryTypes): EmInjuryTypes {
        const copy: EmInjuryTypes = Object.assign({}, emInjuryTypes);

        copy.createdAt = this.dateUtils.toDate(emInjuryTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emInjuryTypes.updatedAt);
        return copy;
    }
}
