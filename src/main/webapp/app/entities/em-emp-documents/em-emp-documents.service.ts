import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpDocuments } from './em-emp-documents.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpDocumentsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-documents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpDocuments: EmEmpDocuments): Observable<EmEmpDocuments> {
        const copy = this.convert(emEmpDocuments);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpDocuments: EmEmpDocuments): Observable<EmEmpDocuments> {
        const copy = this.convert(emEmpDocuments);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpDocuments> {
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
     * Convert a returned JSON object to EmEmpDocuments.
     */
    private convertItemFromServer(json: any): EmEmpDocuments {
        const entity: EmEmpDocuments = Object.assign(new EmEmpDocuments(), json);
        entity.dateCreated = this.dateUtils
            .convertLocalDateFromServer(json.dateCreated);
        entity.validFrom = this.dateUtils
            .convertLocalDateFromServer(json.validFrom);
        entity.validTo = this.dateUtils
            .convertLocalDateFromServer(json.validTo);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpDocuments to a JSON which can be sent to the server.
     */
    private convert(emEmpDocuments: EmEmpDocuments): EmEmpDocuments {
        const copy: EmEmpDocuments = Object.assign({}, emEmpDocuments);
        copy.dateCreated = this.dateUtils
            .convertLocalDateToServer(emEmpDocuments.dateCreated);
        copy.validFrom = this.dateUtils
            .convertLocalDateToServer(emEmpDocuments.validFrom);
        copy.validTo = this.dateUtils
            .convertLocalDateToServer(emEmpDocuments.validTo);

        copy.createdAt = this.dateUtils.toDate(emEmpDocuments.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpDocuments.updatedAt);
        return copy;
    }
}
