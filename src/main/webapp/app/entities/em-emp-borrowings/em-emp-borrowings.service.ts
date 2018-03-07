import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpBorrowingsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-borrowings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpBorrowings: EmEmpBorrowings): Observable<EmEmpBorrowings> {
        const copy = this.convert(emEmpBorrowings);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpBorrowings: EmEmpBorrowings): Observable<EmEmpBorrowings> {
        const copy = this.convert(emEmpBorrowings);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpBorrowings> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByEmployeeId(idEmployee: number): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/employee/' + idEmployee)
            .map((response: Response) =>  this.convertResponse(response));
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
     * Convert a returned JSON object to EmEmpBorrowings.
     */
    private convertItemFromServer(json: any): EmEmpBorrowings {
        const entity: EmEmpBorrowings = Object.assign(new EmEmpBorrowings(), json);
        entity.dateFrom = this.dateUtils
            .convertLocalDateFromServer(json.dateFrom);
        entity.dateTo = this.dateUtils
            .convertLocalDateFromServer(json.dateTo);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpBorrowings to a JSON which can be sent to the server.
     */
    private convert(emEmpBorrowings: EmEmpBorrowings): EmEmpBorrowings {
        const copy: EmEmpBorrowings = Object.assign({}, emEmpBorrowings);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpBorrowings.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpBorrowings.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpBorrowings.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpBorrowings.updatedAt);
        return copy;
    }
}
