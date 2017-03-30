import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Group } from '../../shared/group.model';
import { GroupService } from '../../shared/group.service';
import { GroupCreatePage } from '../group-create/group-create';
import { GroupDetailPage } from '../group-detail/group-detail';
import { NotificationManager } from '../../providers/notification-manager/notification-manager';


@Component({
    templateUrl: 'group-list.html'
})
export class GroupListPage {
    groupSubscription: any;
    refresher: any;

    groups: Group[];
    filteredGroups: Group[];
    showSearch: Boolean;

    constructor(private navCtrl: NavController, private groupService: GroupService, private nm: NotificationManager) {

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
        if (this.refresher && this.groupSubscription) {
            this.groupService.getGroups(true);

        } else {
            this.groupSubscription = this.groupService.getGroups().subscribe(groups => {
                this.groups = groups.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.filteredGroups = this.groups;

                if (this.refresher) {
                    this.refresher.complete();
                    this.nm.showSuccessMessage('Refreshed');
                }
            });
        }
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.getGroups();
    }

    ngOnInit() {
        this.getGroups();
        this.showSearch = false;
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

}
