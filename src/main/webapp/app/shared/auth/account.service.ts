import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class AccountService  {
    constructor(private http: Http) { }

    get(): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/account').map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post(SERVER_API_URL + 'api/account', account);
    }

    saveImage(fileInput: any) {
        if (fileInput != null) {
            const file: File = fileInput;
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            return this.http.post(SERVER_API_URL + 'api/account/uploadFile', formData).map(
                (response: Response) => {
                    return response.text();
                }
            )
        }
    }
}
