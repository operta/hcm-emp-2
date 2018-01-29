import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LeLegalEntitiesService {

    private resourceUrl =  SERVER_API_URL + 'api/le-legal-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(leLegalEntities: LeLegalEntities): Observable<LeLegalEntities> {
        const copy = this.convert(leLegalEntities);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(leLegalEntities: LeLegalEntities): Observable<LeLegalEntities> {
        const copy = this.convert(leLegalEntities);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LeLegalEntities> {
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
     * Convert a returned JSON object to LeLegalEntities.
     */
    private convertItemFromServer(json: any): LeLegalEntities {
        const entity: LeLegalEntities = Object.assign(new LeLegalEntities(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a LeLegalEntities to a JSON which can be sent to the server.
     */
    private convert(leLegalEntities: LeLegalEntities): LeLegalEntities {
        const copy: LeLegalEntities = Object.assign({}, leLegalEntities);

        copy.createdAt = this.dateUtils.toDate(leLegalEntities.createdAt);

        copy.updatedAt = this.dateUtils.toDate(leLegalEntities.updatedAt);
        return copy;
    }
}
