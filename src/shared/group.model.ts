import {Contact} from './contact.model';

export class Group {
    id: number;
    name: string;
    owner: number;
    contacts: Contact[];
}
