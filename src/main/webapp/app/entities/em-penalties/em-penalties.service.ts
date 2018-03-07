import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmPenalties } from './em-penalties.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmPenaltiesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-penalties';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emPenalties: EmPenalties): Observable<EmPenalties> {
        const copy = this.convert(emPenalties);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emPenalties: EmPenalties): Observable<EmPenalties> {
        const copy = this.convert(emPenalties);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmPenalties> {
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
     * Convert a returned JSON object to EmPenalties.
     */
    private convertItemFromServer(json: any): EmPenalties {
        const entity: EmPenalties = Object.assign(new EmPenalties(), json);
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
     * Convert a EmPenalties to a JSON which can be sent to the server.
     */
    private convert(emPenalties: EmPenalties): EmPenalties {
        const copy: EmPenalties = Object.assign({}, emPenalties);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emPenalties.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emPenalties.dateTo);

        copy.createdAt = this.dateUtils.toDate(emPenalties.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emPenalties.updatedAt);
        return copy;
    }
}
