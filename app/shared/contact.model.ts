import {Profile} from './profile.model';

export class Contact {
    id: number;
    profile: Profile;
    tags: string[];
    outlook_id: string;

    constructor() {
        this.profile = new Profile();
        this.tags = [];
    }
}
