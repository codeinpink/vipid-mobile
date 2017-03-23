export class Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
    phone_number: string;
    title: string;
    industry: string;
    company: string;
    location: string;
    summary: string;

    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;

    constructor() {
            this.first_name = '';
            this.last_name = '';
            this.email = '';
            this.picture = '';
            this.phone_number = null;
            this.title = '';
            this.industry = '';
            this.company = '';
            this.location = '';
            this.summary = '';
            this.website = '';
            this.linkedin = '';
            this.github = '';
            this.twitter = '';
            this.facebook = '';
            this.instagram = '';
            this.youtube = '';
    }
}
