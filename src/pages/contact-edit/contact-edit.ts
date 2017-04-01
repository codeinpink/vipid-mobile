import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';


@Component({
    templateUrl: 'contact-edit.html'
})
export class ContactEditPage implements OnInit {
    private contactSubscription: any;

    editingProfile: boolean;
    contact: Contact;
    valid: boolean;

    constructor(private nav: NavController, private navParams: NavParams, private appCtrl: App, private contactService: ContactService) {}

    getContact() {
        let id = +this.navParams.get('id');
        this.contactSubscription = this.contactService.getContacts().subscribe(contacts => {
            console.log('updating edit view contact');
            this.contact = contacts.filter(contact => contact.id === id)[0];
        });
    }

    onChanged(ev) {
        if (this.editingProfile) {
            this.contact.profile = ev.data;
        } else {
            this.contact.about = ev.data.about;
            this.contact.meet = ev.data.meet;
            this.contact.tags = ev.data.tags;
        }

        this.valid = ev.valid;
    }

    onSave() {
        if (this.valid) {
            this.contactService.editContact(this.contact).subscribe(_ => {
                this.nav.pop();
            });
        }
    }

    ngOnInit() {
        this.getContact();
        this.editingProfile = this.navParams.get('editingProfile');
    }

    ngOnDestroy() {
        this.contactSubscription.unsubscribe();
    }
}
