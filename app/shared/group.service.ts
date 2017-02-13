import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Group} from './group.model';
import {GROUPS} from './mock-groups';

@Injectable()
export class GroupService {
    private groupsUrl = 'http://localhost:8000/api/contact-groups/';
    private grouptDetailUrl = this.groupsUrl + '{ID}' + '/';

    constructor(private http: Http) {}

    getGroups(): Observable<Group[]> {
        return this.http.get(this.groupsUrl).map(this.extractData).catch(this.handleError);
    }

    getGroup(id: number) {
        return this.getGroups().map(groups => groups.filter(group => group.id === id)[0]);
    }

    createGroup(data: any) {
        // This needs to be replaced with the current user's ID, prolly through a service
        data.owner = 1;
        return this.http.post(this.groupsUrl, data).map(this.extractData).catch(this.handleError);
    }

    updateGroup(data: any) {
        // This needs to be replaced with the current user's ID, prolly through a service
        data.owner = 1;
        return this.http.patch(this.grouptDetailUrl.replace('{ID}', data.id), data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteGroup(data: any) {
        return this.http.delete(this.grouptDetailUrl.replace('{ID}', data.id))
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
