import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DmDocumentTypes } from './dm-document-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DmDocumentTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/dm-document-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dmDocumentTypes: DmDocumentTypes): Observable<DmDocumentTypes> {
        const copy = this.convert(dmDocumentTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dmDocumentTypes: DmDocumentTypes): Observable<DmDocumentTypes> {
        const copy = this.convert(dmDocumentTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DmDocumentTypes> {
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
     * Convert a returned JSON object to DmDocumentTypes.
     */
    private convertItemFromServer(json: any): DmDocumentTypes {
        const entity: DmDocumentTypes = Object.assign(new DmDocumentTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a DmDocumentTypes to a JSON which can be sent to the server.
     */
    private convert(dmDocumentTypes: DmDocumentTypes): DmDocumentTypes {
        const copy: DmDocumentTypes = Object.assign({}, dmDocumentTypes);

        copy.createdAt = this.dateUtils.toDate(dmDocumentTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(dmDocumentTypes.updatedAt);
        return copy;
    }
}
