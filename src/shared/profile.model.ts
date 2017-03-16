export class Profile {
    id: number;
    name: string;
    email: string;
    picture: string;
    phone_number: string;
    title: string;
    company: string;
    location: string;

    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;

    constructor() {
            this.name = '';
            this.email = '';
            this.picture = '';
            this.phone_number = null;
            this.title = '';
            this.company = '';
            this.location = '';
            this.website = '';
            this.linkedin = '';
            this.github = '';
            this.twitter = '';
            this.facebook = '';
            this.instagram = '';
            this.youtube = '';
    }
}
