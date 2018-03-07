import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmBorrowingTypes } from './em-borrowing-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmBorrowingTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-borrowing-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emBorrowingTypes: EmBorrowingTypes): Observable<EmBorrowingTypes> {
        const copy = this.convert(emBorrowingTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emBorrowingTypes: EmBorrowingTypes): Observable<EmBorrowingTypes> {
        const copy = this.convert(emBorrowingTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmBorrowingTypes> {
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
     * Convert a returned JSON object to EmBorrowingTypes.
     */
    private convertItemFromServer(json: any): EmBorrowingTypes {
        const entity: EmBorrowingTypes = Object.assign(new EmBorrowingTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmBorrowingTypes to a JSON which can be sent to the server.
     */
    private convert(emBorrowingTypes: EmBorrowingTypes): EmBorrowingTypes {
        const copy: EmBorrowingTypes = Object.assign({}, emBorrowingTypes);

        copy.createdAt = this.dateUtils.toDate(emBorrowingTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emBorrowingTypes.updatedAt);
        return copy;
    }
}
