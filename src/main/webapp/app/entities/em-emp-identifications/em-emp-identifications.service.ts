import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpIdentifications } from './em-emp-identifications.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpIdentificationsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-identifications';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpIdentifications: EmEmpIdentifications): Observable<EmEmpIdentifications> {
        const copy = this.convert(emEmpIdentifications);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpIdentifications: EmEmpIdentifications): Observable<EmEmpIdentifications> {
        const copy = this.convert(emEmpIdentifications);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpIdentifications> {
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
     * Convert a returned JSON object to EmEmpIdentifications.
     */
    private convertItemFromServer(json: any): EmEmpIdentifications {
        const entity: EmEmpIdentifications = Object.assign(new EmEmpIdentifications(), json);
        entity.validThrough = this.dateUtils
            .convertLocalDateFromServer(json.validThrough);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpIdentifications to a JSON which can be sent to the server.
     */
    private convert(emEmpIdentifications: EmEmpIdentifications): EmEmpIdentifications {
        const copy: EmEmpIdentifications = Object.assign({}, emEmpIdentifications);
        copy.validThrough = this.dateUtils
            .convertLocalDateToServer(emEmpIdentifications.validThrough);

        copy.createdAt = this.dateUtils.toDate(emEmpIdentifications.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpIdentifications.updatedAt);
        return copy;
    }
}
