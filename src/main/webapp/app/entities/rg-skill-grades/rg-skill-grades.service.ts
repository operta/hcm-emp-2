import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgSkillGrades } from './rg-skill-grades.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgSkillGradesService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-skill-grades';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgSkillGrades: RgSkillGrades): Observable<RgSkillGrades> {
        const copy = this.convert(rgSkillGrades);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgSkillGrades: RgSkillGrades): Observable<RgSkillGrades> {
        const copy = this.convert(rgSkillGrades);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgSkillGrades> {
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
     * Convert a returned JSON object to RgSkillGrades.
     */
    private convertItemFromServer(json: any): RgSkillGrades {
        const entity: RgSkillGrades = Object.assign(new RgSkillGrades(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgSkillGrades to a JSON which can be sent to the server.
     */
    private convert(rgSkillGrades: RgSkillGrades): RgSkillGrades {
        const copy: RgSkillGrades = Object.assign({}, rgSkillGrades);

        copy.createdAt = this.dateUtils.toDate(rgSkillGrades.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgSkillGrades.updatedAt);
        return copy;
    }
}
