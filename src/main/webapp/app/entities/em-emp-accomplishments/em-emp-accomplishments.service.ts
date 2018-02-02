import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpAccomplishmentsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-accomplishments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpAccomplishments: EmEmpAccomplishments): Observable<EmEmpAccomplishments> {
        const copy = this.convert(emEmpAccomplishments);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpAccomplishments: EmEmpAccomplishments): Observable<EmEmpAccomplishments> {
        const copy = this.convert(emEmpAccomplishments);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpAccomplishments> {
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
     * Convert a returned JSON object to EmEmpAccomplishments.
     */
    private convertItemFromServer(json: any): EmEmpAccomplishments {
        const entity: EmEmpAccomplishments = Object.assign(new EmEmpAccomplishments(), json);
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
     * Convert a EmEmpAccomplishments to a JSON which can be sent to the server.
     */
    private convert(emEmpAccomplishments: EmEmpAccomplishments): EmEmpAccomplishments {
        const copy: EmEmpAccomplishments = Object.assign({}, emEmpAccomplishments);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpAccomplishments.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpAccomplishments.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpAccomplishments.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpAccomplishments.updatedAt);
        return copy;
    }
}
