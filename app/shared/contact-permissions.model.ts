import {Profile} from './profile.model';

export class ContactPermissions {
    id: number;
    profile: Profile;
    can_view_phone_number: boolean;
    can_view_website: boolean;
    can_view_linkedin: boolean;
    can_view_github: boolean;
    can_view_twitter: boolean;
    can_view_facebook: boolean;
    can_view_instagram: boolean;
    can_view_youtube: boolean;

    constructor() {
        this.profile = new Profile();
        this.can_view_phone_number = false;
        this.can_view_website = true;
        this.can_view_linkedin = true;
        this.can_view_github = true;
        this.can_view_twitter = true;
        this.can_view_facebook = false;
        this.can_view_instagram = false;
        this.can_view_youtube = false;
    }
}
