import {Profile} from './profile.model';

export class Contact {
    id: number;
    profile: Profile;
    about: string;
    tags: string[];
    outlook_id: string;
    shared_permissions: any;

    constructor() {
        this.profile = new Profile();
        this.tags = [];
    }
}
