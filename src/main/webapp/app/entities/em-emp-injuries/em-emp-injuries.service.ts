import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpInjuries } from './em-emp-injuries.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpInjuriesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-injuries';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpInjuries: EmEmpInjuries): Observable<EmEmpInjuries> {
        const copy = this.convert(emEmpInjuries);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpInjuries: EmEmpInjuries): Observable<EmEmpInjuries> {
        const copy = this.convert(emEmpInjuries);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpInjuries> {
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
     * Convert a returned JSON object to EmEmpInjuries.
     */
    private convertItemFromServer(json: any): EmEmpInjuries {
        const entity: EmEmpInjuries = Object.assign(new EmEmpInjuries(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpInjuries to a JSON which can be sent to the server.
     */
    private convert(emEmpInjuries: EmEmpInjuries): EmEmpInjuries {
        const copy: EmEmpInjuries = Object.assign({}, emEmpInjuries);

        copy.createdAt = this.dateUtils.toDate(emEmpInjuries.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpInjuries.updatedAt);
        return copy;
    }
}
