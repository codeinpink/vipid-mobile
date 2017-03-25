import { Profile } from './profile.model';

export class UserSettings extends Profile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    linkedin_connected: boolean;
    picture: string;
    avatar: string;
}
