import { Component, Input } from '@angular/core';


@Component({
  selector: 'profile-detail',
  templateUrl: 'build/components/profile-detail/profile-detail.html'
})
export class ProfileDetail {
    @Input() profile: any;
    @Input() disabled: boolean;

    constructor() {

    }
}
