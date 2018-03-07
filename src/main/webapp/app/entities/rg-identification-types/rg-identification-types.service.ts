import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgIdentificationTypes } from './rg-identification-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgIdentificationTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-identification-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgIdentificationTypes: RgIdentificationTypes): Observable<RgIdentificationTypes> {
        const copy = this.convert(rgIdentificationTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgIdentificationTypes: RgIdentificationTypes): Observable<RgIdentificationTypes> {
        const copy = this.convert(rgIdentificationTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgIdentificationTypes> {
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
     * Convert a returned JSON object to RgIdentificationTypes.
     */
    private convertItemFromServer(json: any): RgIdentificationTypes {
        const entity: RgIdentificationTypes = Object.assign(new RgIdentificationTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgIdentificationTypes to a JSON which can be sent to the server.
     */
    private convert(rgIdentificationTypes: RgIdentificationTypes): RgIdentificationTypes {
        const copy: RgIdentificationTypes = Object.assign({}, rgIdentificationTypes);

        copy.createdAt = this.dateUtils.toDate(rgIdentificationTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgIdentificationTypes.updatedAt);
        return copy;
    }
}
