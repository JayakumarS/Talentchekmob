import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  
 
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  
  
  {
    path: 'user-signup',
    loadChildren: () => import('./user-signup/user-signup.module').then( m => m.UserSignupPageModule)
  },
  {
    path: 'add-academic-information',
    loadChildren: () => import('./add-academic-information/add-academic-information.module').then( m => m.AddAcademicInformationPageModule)
  },
  
 
 
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'seriveslist',
    loadChildren: () => import('./seriveslist/seriveslist.module').then( m => m.SeriveslistPageModule)
  },
  
  
  {
    path: 'sub-services',
    loadChildren: () => import('./sub-services/sub-services.module').then( m => m.SubServicesPageModule)
  },
  
  {
    path: 'yettostart',
    loadChildren: () => import('./yettostart/yettostart.module').then( m => m.YettostartPageModule)
  },
  
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  
  {
    path: 'yettostart-frommenu',
    loadChildren: () => import('./yettostart-frommenu/yettostart-frommenu.module').then( m => m.YettostartFrommenuPageModule)
  },
  
  
  
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  
  {
    path: 'profile-search',
    loadChildren: () => import('./profile-search/profile-search.module').then( m => m.ProfileSearchPageModule)
  },
  
  
 
  {
    path: 'forget-password-reset-success',
    loadChildren: () => import('./forget-password-reset-success/forget-password-reset-success.module').then( m => m.ForgetPasswordResetSuccessPageModule)
  },
  {
    path: 'dashboard-individual',
    loadChildren: () => import('./dashboard-givven/dashboard-individual.module').then( m => m.DashboardIndividualPageModule)
  },
  
  {
    path: 'folder-password-modal',
    loadChildren: () => import('./folder-password-modal/folder-password-modal.module').then( m => m.FolderPasswordModalPageModule)
  },
  
 
  {
    path: 'delete-my-account',
    loadChildren: () => import('./delete-my-account/delete-my-account.module').then( m => m.DeleteMyAccountPageModule)
  },
  {
    path: 'call-entry',
    loadChildren: () => import('./call-entry/call-entry.module').then( m => m.CallEntryPageModule)
  },
  {
    path: 'g-track',
    loadChildren: () => import('./g-track/g-track.module').then( m => m.GTrackPageModule)
  },
  {
    path: 'call-entry-customer-search',
    loadChildren: () => import('./call-entry-customer-search/call-entry-customer-search.module').then( m => m.CallEntryCustomerSearchPageModule)
  },
  {
    path: 'edit-customer-modal',
    loadChildren: () => import('./modals/edit-customer-modal/edit-customer-modal.module').then( m => m.EditCustomerModalPageModule)
  },
  {
    path: 'hello-dear',
    loadChildren: () => import('./hello-dear/hello-dear.module').then( m => m.HelloDearPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'job-search',
    loadChildren: () => import('./job-search/job-search.module').then( m => m.JobSearchPageModule)
  },

  {
    path: 'profile-view',
    loadChildren: () => import('./profile-view/profile-view.module').then( m => m.ProfileViewModule)
  },
  {
    path: 'search-settings',
    loadChildren: () => import('./search-settings/search-settings.module').then( m => m.SearchSettingsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInModule)
  },
  {
    path: 'sign-up-institution',
    loadChildren: () => import('./sign-up-institution/sign-up-institution.module').then( m => m.SignUpInstitutionPageModule)
  },
  {
    path: 'sign-up-organization',
    loadChildren: () => import('./sign-up-organization/sign-up-organization.module').then( m => m.SignUpOrganizationPageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'push-notification',
    loadChildren: () => import('./push-notification/push-notification.module').then( m => m.PushNotificationPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'about-device',
    loadChildren: () => import('./about-device/about-device.module').then( m => m.AboutDevicePageModule)
  }



 
  
  
  
  
 
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
