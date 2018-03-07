import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpFamilies } from './em-emp-families.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpFamiliesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-families';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpFamilies: EmEmpFamilies): Observable<EmEmpFamilies> {
        const copy = this.convert(emEmpFamilies);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpFamilies: EmEmpFamilies): Observable<EmEmpFamilies> {
        const copy = this.convert(emEmpFamilies);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpFamilies> {
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
     * Convert a returned JSON object to EmEmpFamilies.
     */
    private convertItemFromServer(json: any): EmEmpFamilies {
        const entity: EmEmpFamilies = Object.assign(new EmEmpFamilies(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpFamilies to a JSON which can be sent to the server.
     */
    private convert(emEmpFamilies: EmEmpFamilies): EmEmpFamilies {
        const copy: EmEmpFamilies = Object.assign({}, emEmpFamilies);

        copy.createdAt = this.dateUtils.toDate(emEmpFamilies.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpFamilies.updatedAt);
        return copy;
    }
}
