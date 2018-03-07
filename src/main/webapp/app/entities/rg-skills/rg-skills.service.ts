import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RgSkills } from './rg-skills.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RgSkillsService {

    private resourceUrl =  SERVER_API_URL + 'api/rg-skills';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rgSkills: RgSkills): Observable<RgSkills> {
        const copy = this.convert(rgSkills);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rgSkills: RgSkills): Observable<RgSkills> {
        const copy = this.convert(rgSkills);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RgSkills> {
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
     * Convert a returned JSON object to RgSkills.
     */
    private convertItemFromServer(json: any): RgSkills {
        const entity: RgSkills = Object.assign(new RgSkills(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a RgSkills to a JSON which can be sent to the server.
     */
    private convert(rgSkills: RgSkills): RgSkills {
        const copy: RgSkills = Object.assign({}, rgSkills);

        copy.createdAt = this.dateUtils.toDate(rgSkills.createdAt);

        copy.updatedAt = this.dateUtils.toDate(rgSkills.updatedAt);
        return copy;
    }
}
