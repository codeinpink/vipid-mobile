import {ContactPermissions} from './contact-permissions.model';

export class ShareableProfile extends ContactPermissions {
    title: string;
    unique_link: string;

    constructor() {
        super();

        this.can_view_phone_number = true;
        this.can_view_website = true;
        this.can_view_linkedin = true;
        this.can_view_github = true;
        this.can_view_twitter = true;
        this.can_view_facebook = false;
        this.can_view_instagram = false;
        this.can_view_youtube = false;
    }
}
