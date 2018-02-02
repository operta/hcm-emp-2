import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpSchools } from './em-emp-schools.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpSchoolsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-schools';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpSchools: EmEmpSchools): Observable<EmEmpSchools> {
        const copy = this.convert(emEmpSchools);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpSchools: EmEmpSchools): Observable<EmEmpSchools> {
        const copy = this.convert(emEmpSchools);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpSchools> {
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
     * Convert a returned JSON object to EmEmpSchools.
     */
    private convertItemFromServer(json: any): EmEmpSchools {
        const entity: EmEmpSchools = Object.assign(new EmEmpSchools(), json);
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
     * Convert a EmEmpSchools to a JSON which can be sent to the server.
     */
    private convert(emEmpSchools: EmEmpSchools): EmEmpSchools {
        const copy: EmEmpSchools = Object.assign({}, emEmpSchools);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpSchools.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpSchools.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpSchools.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpSchools.updatedAt);
        return copy;
    }
}
