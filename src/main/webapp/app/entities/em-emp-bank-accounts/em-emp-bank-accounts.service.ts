import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmEmpBankAccountsService {

    private resourceUrl =  SERVER_API_URL + 'api/em-emp-bank-accounts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(emEmpBankAccounts: EmEmpBankAccounts): Observable<EmEmpBankAccounts> {
        const copy = this.convert(emEmpBankAccounts);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(emEmpBankAccounts: EmEmpBankAccounts): Observable<EmEmpBankAccounts> {
        const copy = this.convert(emEmpBankAccounts);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EmEmpBankAccounts> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByIdEmployee(idEmployee: any): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/employee/${idEmployee}`).map(
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
     * Convert a returned JSON object to EmEmpBankAccounts.
     */
    private convertItemFromServer(json: any): EmEmpBankAccounts {
        const entity: EmEmpBankAccounts = Object.assign(new EmEmpBankAccounts(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a EmEmpBankAccounts to a JSON which can be sent to the server.
     */
    private convert(emEmpBankAccounts: EmEmpBankAccounts): EmEmpBankAccounts {
        const copy: EmEmpBankAccounts = Object.assign({}, emEmpBankAccounts);
        copy.createdAt = this.dateUtils.toDate(emEmpBankAccounts.createdAt);
        copy.updatedAt = this.dateUtils.toDate(emEmpBankAccounts.updatedAt);
        return copy;
    }
}
