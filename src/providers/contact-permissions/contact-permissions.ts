import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {HttpService} from '../../shared/http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ContactPermissions} from '../../shared/contact-permissions.model';
import { RoutesConfigService } from "../../shared/routes-config-service";


@Injectable()
export class ContactPermissionsService {
    private contactPermissionsUrl;
    private contactPermissionsDetailUrl;

    constructor(private http: HttpService, routes: RoutesConfigService) {
        this.contactPermissionsUrl = routes.routes.contactPermissionsUrl;
        this.contactPermissionsDetailUrl = routes.routes.contactPermissionsDetailUrl;
    }

    getContactPermissions(id: number) {
        return this.http.get(this.contactPermissionsDetailUrl.replace('{ID}', id.toString())).map(this.extractData)
            .catch(this.handleError);
    }

    updateContactPermissions(id: number, data: any) {
        return this.http.patch(this.contactPermissionsDetailUrl.replace('{ID}', id.toString()), data).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: Response | any) {
        let body = {};

        if (error.text()) {
            body = error.json();
        }

        return Observable.throw(body);
    }
}
