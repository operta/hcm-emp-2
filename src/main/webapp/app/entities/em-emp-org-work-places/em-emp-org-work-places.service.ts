import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpOrgWorkPlacesService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-org-work-places';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces): Observable<EmEmpOrgWorkPlaces> {
        const copy = this.convert(emEmpOrgWorkPlaces);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces): Observable<EmEmpOrgWorkPlaces> {
        const copy = this.convert(emEmpOrgWorkPlaces);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpOrgWorkPlaces> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findLastWorkPlaceForEmployee(id: number): Observable<EmEmpOrgWorkPlaces> {
        return this.http.get(`${this.resourceUrl}/employee/${id}`).map((res: Response) => {
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
     * Convert a returned JSON object to EmEmpOrgWorkPlaces.
     */
    private convertItemFromServer(json: any): EmEmpOrgWorkPlaces {
        const entity: EmEmpOrgWorkPlaces = Object.assign(new EmEmpOrgWorkPlaces(), json);
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
     * Convert a EmEmpOrgWorkPlaces to a JSON which can be sent to the server.
     */
    private convert(emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces): EmEmpOrgWorkPlaces {
        const copy: EmEmpOrgWorkPlaces = Object.assign({}, emEmpOrgWorkPlaces);
        copy.dateFrom = this.dateUtils
            .convertLocalDateToServer(emEmpOrgWorkPlaces.dateFrom);
        copy.dateTo = this.dateUtils
            .convertLocalDateToServer(emEmpOrgWorkPlaces.dateTo);

        copy.createdAt = this.dateUtils.toDate(emEmpOrgWorkPlaces.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpOrgWorkPlaces.updatedAt);
        return copy;
    }
}
