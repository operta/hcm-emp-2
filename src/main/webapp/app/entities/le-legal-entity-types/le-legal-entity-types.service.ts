import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LeLegalEntityTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/le-legal-entity-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(leLegalEntityTypes: LeLegalEntityTypes): Observable<LeLegalEntityTypes> {
        const copy = this.convert(leLegalEntityTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(leLegalEntityTypes: LeLegalEntityTypes): Observable<LeLegalEntityTypes> {
        const copy = this.convert(leLegalEntityTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LeLegalEntityTypes> {
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
     * Convert a returned JSON object to LeLegalEntityTypes.
     */
    private convertItemFromServer(json: any): LeLegalEntityTypes {
        const entity: LeLegalEntityTypes = Object.assign(new LeLegalEntityTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a LeLegalEntityTypes to a JSON which can be sent to the server.
     */
    private convert(leLegalEntityTypes: LeLegalEntityTypes): LeLegalEntityTypes {
        const copy: LeLegalEntityTypes = Object.assign({}, leLegalEntityTypes);

        copy.createdAt = this.dateUtils.toDate(leLegalEntityTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(leLegalEntityTypes.updatedAt);
        return copy;
    }
}
