import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgRegionTypes } from './rg-region-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgRegionTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-region-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgRegionTypes: RgRegionTypes): Observable<RgRegionTypes> {
        const copy = this.convert(rgRegionTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgRegionTypes: RgRegionTypes): Observable<RgRegionTypes> {
        const copy = this.convert(rgRegionTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgRegionTypes> {
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
     * Convert a returned JSON object to RgRegionTypes.
     */
    private convertItemFromServer(json: any): RgRegionTypes {
        const entity: RgRegionTypes = Object.assign(new RgRegionTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgRegionTypes to a JSON which can be sent to the server.
     */
    private convert(rgRegionTypes: RgRegionTypes): RgRegionTypes {
        const copy: RgRegionTypes = Object.assign({}, rgRegionTypes);

        copy.createdAt = this.dateUtils.toDate(rgRegionTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgRegionTypes.updatedAt);
        return copy;
    }
}
