import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpEmgContactsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-emg-contacts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpEmgContacts: EmEmpEmgContacts): Observable<EmEmpEmgContacts> {
        const copy = this.convert(emEmpEmgContacts);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpEmgContacts: EmEmpEmgContacts): Observable<EmEmpEmgContacts> {
        const copy = this.convert(emEmpEmgContacts);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpEmgContacts> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByEmployee(id:number): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/employee/' + id).map(
            (res: Response) => this.convertResponse(res)
        );
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
     * Convert a returned JSON object to EmEmpEmgContacts.
     */
    private convertItemFromServer(json: any): EmEmpEmgContacts {
        const entity: EmEmpEmgContacts = Object.assign(new EmEmpEmgContacts(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpEmgContacts to a JSON which can be sent to the server.
     */
    private convert(emEmpEmgContacts: EmEmpEmgContacts): EmEmpEmgContacts {
        const copy: EmEmpEmgContacts = Object.assign({}, emEmpEmgContacts);

        copy.createdAt = this.dateUtils.toDate(emEmpEmgContacts.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpEmgContacts.updatedAt);
        return copy;
    }
}
