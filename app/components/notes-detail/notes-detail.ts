import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/contact.model';


@Component({
  selector: 'notes-detail',
  templateUrl: 'build/components/notes-detail/notes-detail.html'
})
export class NotesDetail {
    @Input() contact: Contact;

    constructor() {

    }
}
