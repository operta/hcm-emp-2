import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpRewards } from './em-emp-rewards.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpRewardsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-rewards';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpRewards: EmEmpRewards): Observable<EmEmpRewards> {
        const copy = this.convert(emEmpRewards);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpRewards: EmEmpRewards): Observable<EmEmpRewards> {
        const copy = this.convert(emEmpRewards);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpRewards> {
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
     * Convert a returned JSON object to EmEmpRewards.
     */
    private convertItemFromServer(json: any): EmEmpRewards {
        const entity: EmEmpRewards = Object.assign(new EmEmpRewards(), json);
        entity.dateReward = this.dateUtils
            .convertLocalDateFromServer(json.dateReward);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpRewards to a JSON which can be sent to the server.
     */
    private convert(emEmpRewards: EmEmpRewards): EmEmpRewards {
        const copy: EmEmpRewards = Object.assign({}, emEmpRewards);
        copy.dateReward = this.dateUtils
            .convertLocalDateToServer(emEmpRewards.dateReward);

        copy.createdAt = this.dateUtils.toDate(emEmpRewards.createdAt);

        copy.updatedAt = this.dateUtils.toDate(emEmpRewards.updatedAt);
        return copy;
    }
}
