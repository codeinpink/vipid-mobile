import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { GroupCreatePage } from '../group-create/group-create';
import { GroupDetailPage } from '../group-detail/group-detail';


@Component({
    templateUrl: 'group-list.html',
    providers: [GroupService]
})
export class GroupListPage {
    groups: Group[];
    filteredGroups: Group[];
    showSearch: Boolean;

    constructor(private navCtrl: NavController, private groupService: GroupService) {

    }

    onAddClick() {
        this.navCtrl.push(GroupCreatePage);
    }

    onGroupSelect(group: Group) {
        this.navCtrl.push(GroupDetailPage, {
            group: group
        });
    }

    filterGroups(ev: any) {
        let val = ev.target.value;

        if (val.trim() === '') {
            this.resetGroups();
        } else {
            this.filteredGroups = this.groups.filter((group) => {
                return (group.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    resetGroups() {
        this.filteredGroups = this.groups;
    }

    clearSearch() {
        this.resetGroups();
        this.toggleSearch();
    }

    getGroups() {
        this.groupService.getGroups().subscribe(groups => {
            this.groups = groups;
            this.filteredGroups = groups;
        });
    }

    ngOnInit() {
        this.getGroups();
        this.showSearch = false;
    }

}