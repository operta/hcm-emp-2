import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OgWorkPlaceSkillsService {

    private resourceUrl =  SERVER_API_URL + 'api/og-work-place-skills';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ogWorkPlaceSkills: OgWorkPlaceSkills): Observable<OgWorkPlaceSkills> {
        const copy = this.convert(ogWorkPlaceSkills);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ogWorkPlaceSkills: OgWorkPlaceSkills): Observable<OgWorkPlaceSkills> {
        const copy = this.convert(ogWorkPlaceSkills);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OgWorkPlaceSkills> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByWorkplace(id: number) : Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/workplace/' + id).map(
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
     * Convert a returned JSON object to OgWorkPlaceSkills.
     */
    private convertItemFromServer(json: any): OgWorkPlaceSkills {
        const entity: OgWorkPlaceSkills = Object.assign(new OgWorkPlaceSkills(), json);
        entity.dateSkill = this.dateUtils
            .convertLocalDateFromServer(json.dateSkill);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a OgWorkPlaceSkills to a JSON which can be sent to the server.
     */
    private convert(ogWorkPlaceSkills: OgWorkPlaceSkills): OgWorkPlaceSkills {
        const copy: OgWorkPlaceSkills = Object.assign({}, ogWorkPlaceSkills);
        copy.dateSkill = this.dateUtils
            .convertLocalDateToServer(ogWorkPlaceSkills.dateSkill);

        copy.createdAt = this.dateUtils.toDate(ogWorkPlaceSkills.createdAt);

        copy.updatedAt = this.dateUtils.toDate(ogWorkPlaceSkills.updatedAt);
        return copy;
    }
}
