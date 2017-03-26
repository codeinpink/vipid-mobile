import {Contact} from './contact.model';
import {ContactPermissions} from './contact-permissions.model';

export class ContactRequest extends ContactPermissions {
    receiver: number;
    sender: number;

    public setPermissions(permissions) {
        this.can_view_phone_number = permissions.can_view_phone_number;
        this.can_view_website = permissions.can_view_phone_number;
        this.can_view_linkedin = permissions.can_view_phone_number;
        this.can_view_github = permissions.can_view_phone_number;
        this.can_view_twitter = permissions.can_view_phone_number;
        this.can_view_facebook = permissions.can_view_phone_number;
        this.can_view_instagram = permissions.can_view_phone_number;
        this.can_view_youtube = permissions.can_view_phone_number;
    }
}
