import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpSkills } from './em-emp-skills.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpSkillsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-skills';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpSkills: EmEmpSkills): Observable<EmEmpSkills> {
        const copy = this.convert(emEmpSkills);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpSkills: EmEmpSkills): Observable<EmEmpSkills> {
        const copy = this.convert(emEmpSkills);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpSkills> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByEmployeeId(idEmployee: number): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + '/employee/' + idEmployee)
            .map((response: Response) =>  this.convertResponse(response));
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
     * Convert a returned JSON object to EmEmpSkills.
     */
    private convertItemFromServer(json: any): EmEmpSkills {
        const entity: EmEmpSkills = Object.assign(new EmEmpSkills(), json);
        entity.dateSkill = this.dateUtils
            .convertLocalDateFromServer(json.dateSkill);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpSkills to a JSON which can be sent to the server.
     */
    private convert(emEmpSkills: EmEmpSkills): EmEmpSkills {
        const copy: EmEmpSkills = Object.assign({}, emEmpSkills);
        copy.dateSkill = this.dateUtils
            .convertLocalDateToServer(emEmpSkills.dateSkill);

        copy.createdAt = this.dateUtils.toDate(emEmpSkills.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpSkills.updatedAt);
        return copy;
    }
}
