import {Injectable} from '@angular/core';
import {Group} from './group.model';
import {GROUPS} from './mock-groups';

@Injectable()
export class GroupService {
    getGroups() {
        return Promise.resolve(GROUPS);
    }

    getGroup(id: number) {
        return Promise.resolve(this.getGroups().then(groups => groups.filter(group => group.id === id)[0]));
    }
}
