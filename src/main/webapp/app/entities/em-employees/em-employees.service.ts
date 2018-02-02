import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmployees } from './em-employees.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmployeesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-employees';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmployees: EmEmployees): Observable<EmEmployees> {
        const copy = this.convert(emEmployees);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmployees: EmEmployees): Observable<EmEmployees> {
        const copy = this.convert(emEmployees);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmployees> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByUser(id: number): Observable<EmEmployees> {
        return this.http.get(`${this.resourceUrl}/user/${id}`).map((res: Response) => {
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
     * Convert a returned JSON object to EmEmployees.
     */
    private convertItemFromServer(json: any): EmEmployees {
        const entity: EmEmployees = Object.assign(new EmEmployees(), json);
        entity.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(json.dateOfBirth);
        entity.hireDate = this.dateUtils
            .convertLocalDateFromServer(json.hireDate);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmployees to a JSON which can be sent to the server.
     */
    private convert(emEmployees: EmEmployees): EmEmployees {
        const copy: EmEmployees = Object.assign({}, emEmployees);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(emEmployees.dateOfBirth);
        copy.hireDate = this.dateUtils
            .convertLocalDateToServer(emEmployees.hireDate);

        copy.createdAt = this.dateUtils.toDate(emEmployees.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmployees.updatedAt);
        return copy;
    }
}
