import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgRegions } from './rg-regions.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgRegionsService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-regions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgRegions: RgRegions): Observable<RgRegions> {
        const copy = this.convert(rgRegions);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgRegions: RgRegions): Observable<RgRegions> {
        const copy = this.convert(rgRegions);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgRegions> {
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
     * Convert a returned JSON object to RgRegions.
     */
    private convertItemFromServer(json: any): RgRegions {
        const entity: RgRegions = Object.assign(new RgRegions(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgRegions to a JSON which can be sent to the server.
     */
    private convert(rgRegions: RgRegions): RgRegions {
        const copy: RgRegions = Object.assign({}, rgRegions);

        copy.createdAt = this.dateUtils.toDate(rgRegions.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgRegions.updatedAt);
        return copy;
    }
}
