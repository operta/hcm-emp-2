import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DmDocumentLinks } from './dm-document-links.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DmDocumentLinksService {

    private resourceUrl =  SERVER_API_URL + 'api/dm-document-links';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dmDocumentLinks: DmDocumentLinks): Observable<DmDocumentLinks> {
        const copy = this.convert(dmDocumentLinks);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dmDocumentLinks: DmDocumentLinks): Observable<DmDocumentLinks> {
        const copy = this.convert(dmDocumentLinks);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DmDocumentLinks> {
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
     * Convert a returned JSON object to DmDocumentLinks.
     */
    private convertItemFromServer(json: any): DmDocumentLinks {
        const entity: DmDocumentLinks = Object.assign(new DmDocumentLinks(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a DmDocumentLinks to a JSON which can be sent to the server.
     */
    private convert(dmDocumentLinks: DmDocumentLinks): DmDocumentLinks {
        const copy: DmDocumentLinks = Object.assign({}, dmDocumentLinks);

        copy.createdAt = this.dateUtils.toDate(dmDocumentLinks.createdAt);

        copy.updatedAt = this.dateUtils.toDate(dmDocumentLinks.updatedAt);
        return copy;
    }
}
