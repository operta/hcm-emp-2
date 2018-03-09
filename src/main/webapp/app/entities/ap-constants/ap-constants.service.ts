import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ApConstants } from './ap-constants.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ApConstantsService {

    private resourceUrl =  SERVER_API_URL + 'api/ap-constants';

    constructor(private http: Http) { }

    create(apConstants: ApConstants): Observable<ApConstants> {
        const copy = this.convert(apConstants);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(apConstants: ApConstants): Observable<ApConstants> {
        const copy = this.convert(apConstants);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ApConstants> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByKey(key: string): Observable<ApConstants> {
        return this.http.get(this.resourceUrl + '/key/' + key).map((res: Response) => {
            return res.json();
        })
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
     * Convert a returned JSON object to ApConstants.
     */
    private convertItemFromServer(json: any): ApConstants {
        const entity: ApConstants = Object.assign(new ApConstants(), json);
        return entity;
    }

    /**
     * Convert a ApConstants to a JSON which can be sent to the server.
     */
    private convert(apConstants: ApConstants): ApConstants {
        const copy: ApConstants = Object.assign({}, apConstants);
        return copy;
    }
}
