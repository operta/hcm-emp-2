import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmStatuses } from './em-statuses.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmStatusesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-statuses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emStatuses: EmStatuses): Observable<EmStatuses> {
        const copy = this.convert(emStatuses);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emStatuses: EmStatuses): Observable<EmStatuses> {
        const copy = this.convert(emStatuses);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmStatuses> {
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
     * Convert a returned JSON object to EmStatuses.
     */
    private convertItemFromServer(json: any): EmStatuses {
        const entity: EmStatuses = Object.assign(new EmStatuses(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmStatuses to a JSON which can be sent to the server.
     */
    private convert(emStatuses: EmStatuses): EmStatuses {
        const copy: EmStatuses = Object.assign({}, emStatuses);

        copy.createdAt = this.dateUtils.toDate(emStatuses.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emStatuses.updatedAt);
        return copy;
    }
}
