import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmContractTypes } from './em-contract-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmContractTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-contract-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emContractTypes: EmContractTypes): Observable<EmContractTypes> {
        const copy = this.convert(emContractTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emContractTypes: EmContractTypes): Observable<EmContractTypes> {
        const copy = this.convert(emContractTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmContractTypes> {
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
     * Convert a returned JSON object to EmContractTypes.
     */
    private convertItemFromServer(json: any): EmContractTypes {
        const entity: EmContractTypes = Object.assign(new EmContractTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmContractTypes to a JSON which can be sent to the server.
     */
    private convert(emContractTypes: EmContractTypes): EmContractTypes {
        const copy: EmContractTypes = Object.assign({}, emContractTypes);

        copy.createdAt = this.dateUtils.toDate(emContractTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emContractTypes.updatedAt);
        return copy;
    }
}
