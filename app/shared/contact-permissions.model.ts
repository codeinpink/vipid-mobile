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
}
