import { Component, Input } from '@angular/core';


@Component({
  selector: 'profile-detail',
  templateUrl: 'profile-detail.html'
})
export class ProfileDetail {
    @Input() profile: any;
    @Input() disabled: boolean;
    @Input() hide_missing: boolean;

    constructor() {

    }

    hideMissing(input: any) {
        return this.hide_missing && input == null;
    }
}
