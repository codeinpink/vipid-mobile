import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { QRCodeModule } from 'angular2-qrcode';
import { TagsInputModule } from 'ionic2-tags-input';

// Pages
import { ContactAddMenuPage } from '../pages/contact-add-menu/contact-add-menu';
import { ContactAddSetNotesPage } from '../pages/contact-add-set-notes/contact-add-set-notes';
import { ContactAddSetPermissionsPage } from '../pages/contact-add-set-permissions/contact-add-set-permissions';
import { ContactCreatePage } from '../pages/contact-create/contact-create';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { ContactEditPage } from '../pages/contact-edit/contact-edit';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ContactNotesDetailPage } from '../pages/contact-notes-detail/contact-notes-detail';
import { ContactPermissionsDetailPage } from '../pages/contact-permissions-detail/contact-permissions-detail';
import { ContactProfileDetailPage } from '../pages/contact-profile-detail/contact-profile-detail';
import { GroupCreatePage } from '../pages/group-create/group-create';
import { GroupDetailPage } from '../pages/group-detail/group-detail';
import { GroupListPage } from '../pages/group-list/group-list';
import { ImportContactsMenuPage } from '../pages/import-contacts-menu/import-contacts-menu';
import { ImportOutlookContactsPage } from '../pages/import-outlook-contacts/import-outlook-contacts';
import { ImportPhoneContactsPage } from '../pages/import-phone-contacts/import-phone-contacts';
import { LoginPage } from '../pages/login/login';
import { MyProfileEditPage } from '../pages/my-profile-edit/my-profile-edit';
import { PopoverPage as MyProfileEditPopoverPage } from '../pages/my-profile-edit/popover';
import { NfcAddPage } from '../pages/nfc-add/nfc-add';
import { ShareableProfileCreatePage } from '../pages/shareable-profile-create/shareable-profile-create';
import { ShareableProfileDetailPage } from '../pages/shareable-profile-detail/shareable-profile-detail';
import { ShareableProfileEditPage } from '../pages/shareable-profile-edit/shareable-profile-edit';
import { ShareableProfileListPage } from '../pages/shareable-profile-list/shareable-profile-list';
import { SharedProfileViewPage } from '../pages/shared-profile-view/shared-profile-view';
import { UserFindPage } from '../pages/user-find/user-find';
import { UserFindResultPage } from '../pages/user-find-result/user-find-result';
import { UserSettingsPage } from '../pages/user-settings/user-settings';

// Directives/components
import { ProfileForm } from '../components/profile-form/profile-form';
import { ProfileDetail } from '../components/profile-detail/profile-detail';
import { ContactNotesForm } from '../components/contact-notes-form/contact-notes-form';
import { NotesDetail } from '../components/notes-detail/notes-detail';
import { ContactPermissionsForm } from '../components/contact-permissions-form/contact-permissions-form';
import { ShareableProfileForm } from '../components/shareable-profile-form/shareable-profile-form';
import { XHRBackend, RequestOptions } from '@angular/http';

// Services
import { HttpService } from '../shared/http.service';
import { ContactService } from '../shared/contact.service';
import { GroupService } from '../shared/group.service';
import { AuthService } from '../providers/auth/auth';
import { ContactPermissionsService } from '../providers/contact-permissions/contact-permissions';
import { ShareableProfileService } from '../providers/shareable-profile/shareable-profile';
import { UserProfileService } from '../providers/user-profile/user-profile';
import { NotificationManager } from '../providers/notification-manager/notification-manager';
import { ContactRequestService } from '../shared/contact-request.service';
import { OAuthAccessTokenService } from '../providers/oauth/oauth-access-token';


@NgModule({
  declarations: [
    MyApp,
    ContactAddMenuPage,
    ContactAddSetNotesPage,
    ContactAddSetPermissionsPage,
    ContactCreatePage,
    ContactDetailPage,
    ContactEditPage,
    ContactListPage,
    ContactNotesDetailPage,
    ContactPermissionsDetailPage,
    ContactProfileDetailPage,
    GroupCreatePage,
    GroupDetailPage,
    GroupListPage,
    ImportContactsMenuPage,
    ImportOutlookContactsPage,
    ImportPhoneContactsPage,
    LoginPage,
    MyProfileEditPage,
    MyProfileEditPopoverPage,
    NfcAddPage,
    ShareableProfileCreatePage,
    ShareableProfileDetailPage,
    ShareableProfileEditPage,
    ShareableProfileListPage,
    SharedProfileViewPage,
    UserFindPage,
    UserFindResultPage,
    UserSettingsPage,
    ProfileForm,
    ProfileDetail,
    NotesDetail,
    ContactNotesForm,
    ContactPermissionsForm,
    ShareableProfileForm
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    QRCodeModule,
    TagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactAddMenuPage,
    ContactAddSetNotesPage,
    ContactAddSetPermissionsPage,
    ContactCreatePage,
    ContactDetailPage,
    ContactEditPage,
    ContactListPage,
    ContactNotesDetailPage,
    ContactPermissionsDetailPage,
    ContactProfileDetailPage,
    GroupCreatePage,
    GroupDetailPage,
    GroupListPage,
    ImportContactsMenuPage,
    ImportOutlookContactsPage,
    ImportPhoneContactsPage,
    LoginPage,
    MyProfileEditPage,
    MyProfileEditPopoverPage,
    NfcAddPage,
    ShareableProfileCreatePage,
    ShareableProfileDetailPage,
    ShareableProfileEditPage,
    ShareableProfileListPage,
    SharedProfileViewPage,
    UserFindPage,
    UserFindResultPage,
    UserSettingsPage
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      HttpService,
      ContactService,
      GroupService,
      AuthService,
      ContactPermissionsService,
      ShareableProfileService,
      UserProfileService,
      NotificationManager,
      ContactRequestService,
      OAuthAccessTokenService
  ]
})
export class AppModule {}
