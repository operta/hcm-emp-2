import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpPreviousJobsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-previous-jobs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpPreviousJobs: EmEmpPreviousJobs): Observable<EmEmpPreviousJobs> {
        const copy = this.convert(emEmpPreviousJobs);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpPreviousJobs: EmEmpPreviousJobs): Observable<EmEmpPreviousJobs> {
        const copy = this.convert(emEmpPreviousJobs);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpPreviousJobs> {
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

    queryByEmployee(employeeId: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/employee/' + employeeId, options)
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
     * Convert a returned JSON object to EmEmpPreviousJobs.
     */
    private convertItemFromServer(json: any): EmEmpPreviousJobs {
        const entity: EmEmpPreviousJobs = Object.assign(new EmEmpPreviousJobs(), json);
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
     * Convert a EmEmpPreviousJobs to a JSON which can be sent to the server.
     */
    private convert(emEmpPreviousJobs: EmEmpPreviousJobs): EmEmpPreviousJobs {
        const copy: EmEmpPreviousJobs = Object.assign({}, emEmpPreviousJobs);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpPreviousJobs.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpPreviousJobs.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpPreviousJobs.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpPreviousJobs.updatedAt);
        return copy;
    }
}
