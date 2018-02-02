import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpSalaries } from './em-emp-salaries.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpSalariesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-salaries';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpSalaries: EmEmpSalaries): Observable<EmEmpSalaries> {
        const copy = this.convert(emEmpSalaries);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpSalaries: EmEmpSalaries): Observable<EmEmpSalaries> {
        const copy = this.convert(emEmpSalaries);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpSalaries> {
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
     * Convert a returned JSON object to EmEmpSalaries.
     */
    private convertItemFromServer(json: any): EmEmpSalaries {
        const entity: EmEmpSalaries = Object.assign(new EmEmpSalaries(), json);
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
     * Convert a EmEmpSalaries to a JSON which can be sent to the server.
     */
    private convert(emEmpSalaries: EmEmpSalaries): EmEmpSalaries {
        const copy: EmEmpSalaries = Object.assign({}, emEmpSalaries);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpSalaries.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpSalaries.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpSalaries.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpSalaries.updatedAt);
        return copy;
    }
}
