import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgWorkPlaceTypesService {

    private resourceUrl =  SERVER_API_URL + 'api/og-work-place-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogWorkPlaceTypes: OgWorkPlaceTypes): Observable<OgWorkPlaceTypes> {
        const copy = this.convert(ogWorkPlaceTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogWorkPlaceTypes: OgWorkPlaceTypes): Observable<OgWorkPlaceTypes> {
        const copy = this.convert(ogWorkPlaceTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgWorkPlaceTypes> {
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
     * Convert a returned JSON object to OgWorkPlaceTypes.
     */
    private convertItemFromServer(json: any): OgWorkPlaceTypes {
        const entity: OgWorkPlaceTypes = Object.assign(new OgWorkPlaceTypes(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgWorkPlaceTypes to a JSON which can be sent to the server.
     */
    private convert(ogWorkPlaceTypes: OgWorkPlaceTypes): OgWorkPlaceTypes {
        const copy: OgWorkPlaceTypes = Object.assign({}, ogWorkPlaceTypes);

        copy.createdAt = this.dateUtils.toDate(ogWorkPlaceTypes.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogWorkPlaceTypes.updatedAt);
        return copy;
    }
}
