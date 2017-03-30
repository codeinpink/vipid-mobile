import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService} from './http.service';
import {Observable}     from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import {Group} from './group.model';
import {RoutesConfigService} from "./routes-config-service";


@Injectable()
export class GroupService {
    private _groups: Group[];
    private groups: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);

    private groupsUrl;
    private grouptDetailUrl;

    constructor(private http: HttpService, routes: RoutesConfigService) {
      this.groupsUrl = routes.routes.groupsUrl;
      this.grouptDetailUrl = routes.routes.grouptDetailUrl
    }

    public getGroups(forceRefresh?: boolean) {
        let numSubscribers = this.groups.observers.length;
        console.log('[GROUP SERVICE] # of subscribers: ' + numSubscribers);

        if (this.groups.observers.length === 0 || forceRefresh) {
                this._getGroups().subscribe(groups => {
                    this._groups = groups;
                    this.groups.next(this._groups);
                }, error => {
                    this.groups.error(error);
                    this.groups = new ReplaySubject(1);
                })
        }

        return this.groups;
    }

    private _getGroups(): Observable<Group[]> {
        return this.http.get(this.groupsUrl).map(this.extractData).catch(this.handleError);
    }

    getGroup(id: number) {
        return this.getGroups().map(groups => groups.filter(group => group.id === id)[0]);
    }

    public createGroup(data: any) {
        return this.http.post(this.groupsUrl, data).map(res => {
            let group = res.json();
            this._groups.push(group);
            this.groups.next(this._groups);
        }).catch(this.handleError);
    }

    public updateGroup(data: any) {
        return this.http.patch(this.grouptDetailUrl.replace('{ID}', data.id), data)
            .map(res => {
                let group = res.json();
                let index = this._groups.findIndex(g => g.id === group.id);
                this._groups[index] = group;
                this.groups.next(this._groups);
                return group;
            })
            .catch(this.handleError);
    }

    public deleteGroup(data: any) {
        return this.http.delete(this.grouptDetailUrl.replace('{ID}', data.id))
            .map(_ => {
                let groups = this._groups.filter(group => group.id !== data.id);
                this._groups = groups;
                this.groups.next(this._groups);
            })
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
