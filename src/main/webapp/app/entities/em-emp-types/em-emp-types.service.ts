import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpTypes } from './em-emp-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpTypes: EmEmpTypes): Observable<EmEmpTypes> {
        const copy = this.convert(emEmpTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpTypes: EmEmpTypes): Observable<EmEmpTypes> {
        const copy = this.convert(emEmpTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpTypes> {
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
     * Convert a returned JSON object to EmEmpTypes.
     */
    private convertItemFromServer(json: any): EmEmpTypes {
        const entity: EmEmpTypes = Object.assign(new EmEmpTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpTypes to a JSON which can be sent to the server.
     */
    private convert(emEmpTypes: EmEmpTypes): EmEmpTypes {
        const copy: EmEmpTypes = Object.assign({}, emEmpTypes);

        copy.createdAt = this.dateUtils.toDate(emEmpTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpTypes.updatedAt);
        return copy;
    }
}
