import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgSchools } from './rg-schools.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgSchoolsService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-schools';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgSchools: RgSchools): Observable<RgSchools> {
        const copy = this.convert(rgSchools);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgSchools: RgSchools): Observable<RgSchools> {
        const copy = this.convert(rgSchools);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgSchools> {
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
     * Convert a returned JSON object to RgSchools.
     */
    private convertItemFromServer(json: any): RgSchools {
        const entity: RgSchools = Object.assign(new RgSchools(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgSchools to a JSON which can be sent to the server.
     */
    private convert(rgSchools: RgSchools): RgSchools {
        const copy: RgSchools = Object.assign({}, rgSchools);

        copy.createdAt = this.dateUtils.toDate(rgSchools.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgSchools.updatedAt);
        return copy;
    }
}
