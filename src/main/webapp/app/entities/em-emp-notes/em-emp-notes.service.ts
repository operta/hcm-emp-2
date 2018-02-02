import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpNotes } from './em-emp-notes.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpNotesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-notes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpNotes: EmEmpNotes): Observable<EmEmpNotes> {
        const copy = this.convert(emEmpNotes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpNotes: EmEmpNotes): Observable<EmEmpNotes> {
        const copy = this.convert(emEmpNotes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpNotes> {
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
     * Convert a returned JSON object to EmEmpNotes.
     */
    private convertItemFromServer(json: any): EmEmpNotes {
        const entity: EmEmpNotes = Object.assign(new EmEmpNotes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpNotes to a JSON which can be sent to the server.
     */
    private convert(emEmpNotes: EmEmpNotes): EmEmpNotes {
        const copy: EmEmpNotes = Object.assign({}, emEmpNotes);

        copy.createdAt = this.dateUtils.toDate(emEmpNotes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpNotes.updatedAt);
        return copy;
    }
}
