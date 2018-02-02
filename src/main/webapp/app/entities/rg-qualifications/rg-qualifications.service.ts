import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgQualifications } from './rg-qualifications.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgQualificationsService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-qualifications';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgQualifications: RgQualifications): Observable<RgQualifications> {
        const copy = this.convert(rgQualifications);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgQualifications: RgQualifications): Observable<RgQualifications> {
        const copy = this.convert(rgQualifications);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgQualifications> {
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
     * Convert a returned JSON object to RgQualifications.
     */
    private convertItemFromServer(json: any): RgQualifications {
        const entity: RgQualifications = Object.assign(new RgQualifications(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgQualifications to a JSON which can be sent to the server.
     */
    private convert(rgQualifications: RgQualifications): RgQualifications {
        const copy: RgQualifications = Object.assign({}, rgQualifications);

        copy.createdAt = this.dateUtils.toDate(rgQualifications.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgQualifications.updatedAt);
        return copy;
    }
}
