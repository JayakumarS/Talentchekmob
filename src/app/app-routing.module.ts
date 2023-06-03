import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screen',
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
    path: 'profile-search',
    loadChildren: () => import('./profile-search/profile-search.module').then( m => m.ProfileSearchPageModule)
  },

  {
    path: 'forget-password-reset-success',
    loadChildren: () => import('./forget-password-reset-success/forget-password-reset-success.module').then( m => m.ForgetPasswordResetSuccessPageModule)
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
    loadChildren: () => import('./profile-view/profile-view.module').then( m => m.ProfileViewPageModule)
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
  },
  {
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
  },
  {
    path: 'visibility',
    loadChildren: () => import('./visibility/visibility.module').then( m => m.VisibilityPageModule)
  },
  {
    path: 'profile-visibility',
    loadChildren: () => import('./profile-visibility/profile-visibility.module').then( m => m.ProfileVisibilityPageModule)
  },
  {
    path: 'email-visibility',
    loadChildren: () => import('./email-visibility/email-visibility.module').then( m => m.EmailVisibilityPageModule)
  },
  {
    path: 'phone-visibility',
    loadChildren: () => import('./phone-visibility/phone-visibility.module').then( m => m.PhoneVisibilityPageModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then( m => m.JobPageModule)
  },
  {
    path: 'job-details',
    loadChildren: () => import('./job-details/job-details.module').then( m => m.JobDetailsPageModule)
  },
  {
    path: 'job-profile',
    loadChildren: () => import('./job-profile/job-profile.module').then( m => m.JobProfilePageModule)
  },
  {
    path: 'register-cat',
    loadChildren: () => import('./register-cat/register-cat.module').then( m => m.RegisterCatPageModule)
  },
  {
    path: 'awesome',
    loadChildren: () => import('./awesome/awesome.module').then( m => m.AwesomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'profile-view-popup',
    loadChildren: () => import('./profile-view-popup/profile-view-popup.module').then( m => m.ProfileViewPopupPageModule)
  },

  {
    path: 'additional-infoo',
    loadChildren: () => import('./additional-infoo/additional-infoo.module').then( m => m.AdditionalInfooPageModule)
  },
  {
    path: 'certification',
    loadChildren: () => import('./certification/certification.module').then( m => m.CertificationPageModule)
  },
  {
    path: 'club',
    loadChildren: () => import('./club/club.module').then( m => m.ClubPageModule)
  },
  {
    path: 'skill-popup',
    loadChildren: () => import('./skill-popup/skill-popup.module').then( m => m.SkillPopupPageModule)
  },
  {
    path: 'connection',
    loadChildren: () => import('./connection/connection.module').then( m => m.ConnectionPageModule)
  },
  {
    path: 'educations',
    loadChildren: () => import('./educations/educations.module').then( m => m.EducationsPageModule)
  },
  {
    path: 'profilee',
    loadChildren: () => import('./profilee/profilee.module').then( m => m.ProfileePageModule)
  },
  {
    path: 'work-experiences',
    loadChildren: () => import('./work-experiences/work-experiences.module').then( m => m.WorkExperiencesPageModule)
  },
  {
    path: 'apply-for-job',
    loadChildren: () => import('./apply-for-job/apply-for-job.module').then( m => m.ApplyForJobPageModule)
  },
  {
    path: 'subscription-individual',
    loadChildren: () => import('./subscription-individual/subscription-individual.module').then( m => m.SubscriptionIndividualPageModule)
  },
  {
    path: 'tc-form',
    loadChildren: () => import('./tc-form/tc-form.module').then( m => m.TcFormPageModule)
  },
  {
    path: 'consent-form',
    loadChildren: () => import('./consent-form/consent-form.module').then( m => m.ConsentFormPageModule)

  },
  {
    path: 'institution-dashboard',
    loadChildren: () => import('./institution-dashboard/institution-dashboard.module').then( m => m.InstitutionDashboardPageModule)
  },
  {
    path: 'subscription-insorg',
    loadChildren: () => import('./subscription-insorg/subscription-insorg.module').then( m => m.SubscriptionInsorgPageModule)
  },
  {
    path: 'organization-dashboard',
    loadChildren: () => import('./organization-dashboard/organization-dashboard.module').then( m => m.OrganizationDashboardPageModule)
  },
  {
    path: 'org-profile-view',
    loadChildren: () => import('./org-profile-view/org-profile-view.module').then( m => m.OrgProfileViewPageModule)
  },
  {
    path: 'org-profile',
    loadChildren: () => import('./org-profile/org-profile.module').then( m => m.OrgProfilePageModule)
  },
  {
    path: 'insti-profile-view',
    loadChildren: () => import('./insti-profile-view/insti-profile-view.module').then( m => m.InstiProfileViewPageModule)
  },
  {
  path: 'payment',
  loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
},
{
  path: 'insti-profile',
  loadChildren: () => import('./insti-profile/insti-profile.module').then( m => m.InstiProfilePageModule)
},
{  path: 'oni-job-post',
    loadChildren: () => import('./oni-job-post/oni-job-post.module').then( m => m.OniJobPostPageModule)
  },
  {

    path: 'scan-to-connect',
    loadChildren: () => import('./scan-to-connect/scan-to-connect.module').then( m => m.ScanToConnectPageModule)
  },{
    path: 'category-popup',
    loadChildren: () => import('./category-popup/category-popup.module').then( m => m.CategoryPopupPageModule)

  },
  {
    path: 'exp-verification',
    loadChildren: () => import('./exp-verification/exp-verification.module').then( m => m.ExpVerificationPageModule)
  },
  {
    path: 'activity-verification',
    loadChildren: () => import('./activity-verification/activity-verification.module').then( m => m.ActivityVerificationPageModule)
  },
  {
    path: 'edu-verification',
    loadChildren: () => import('./edu-verification/edu-verification.module').then( m => m.EduVerificationPageModule)
  },
  {
    path: 'exp-verifier-details',
    loadChildren: () => import('./exp-verifier-details/exp-verifier-details.module').then( m => m.ExpVerifierDetailsPageModule)
  },
  {
    path: 'edu-verifier-details',
    loadChildren: () => import('./edu-verifier-details/edu-verifier-details.module').then( m => m.EduVerifierDetailsPageModule)
  },
  {
    path: 'academic-verifier-details',
    loadChildren: () => import('./academic-verifier-details/academic-verifier-details.module').then( m => m.AcademicVerifierDetailsPageModule)
  },
  {
    path: 'rating-org-popup',
    loadChildren: () => import('./rating-org-popup/rating-org-popup.module').then( m => m.RatingOrgPopupPageModule)
  },
  {
    path: 'rating-insti-popup',
    loadChildren: () => import('./rating-insti-popup/rating-insti-popup.module').then( m => m.RatingInstiPopupPageModule)
  },
  {
    path: 'category-popup',
    loadChildren: () => import('./category-popup/category-popup.module').then( m => m.CategoryPopupPageModule)

  },
  {
    path: 'organization-dashboard-list',
    loadChildren: () => import('./organization-dashboard-list/organization-dashboard-list.module').then(m => m.OrganizationDashboardListPageModule)
  },
  {
    path: 'institution-dashboard-list',
    loadChildren: () => import('./institution-dashboard-list/institution-dashboard-list.module').then(m => m.InstitutionDashboardListPageModule)
  },
  {
    path: 'oni-job-post-list',
    loadChildren: () => import('./oni-job-post-list/oni-job-post-list.module').then( m => m.OniJobPostListPageModule)
  },
  {
    path: 'oni-view-job-profile-matches-list',
    loadChildren: () => import('./oni-view-job-profile-matches-list/oni-view-job-profile-matches-list.module').then( m => m.OniViewJobProfileMatchesListPageModule)
  },
  {
    path: 'bids-and-aplications-recived-popup',
    loadChildren: () => import('./bids-and-aplications-recived-popup/bids-and-aplications-recived-popup.module').then( m => m.BidsAndAplicationsRecivedPopupPageModule)
  },
  {
    path: 'rating-extra-popup',
    loadChildren: () => import('./rating-extra-popup/rating-extra-popup.module').then( m => m.RatingExtraPopupPageModule)
  },
  {
    path: 'oni-alumni',
    loadChildren: () => import('./oni-alumni/oni-alumni.module').then( m => m.OniAlumniPageModule)
  },
  {
    path: 'oni-alumni-list',
    loadChildren: () => import('./oni-alumni-list/oni-alumni-list.module').then( m => m.OniAlumniListPageModule)
  },
  {
    path: 'web-app-nav',
    loadChildren: () => import('./web-app-nav/web-app-nav.module').then( m => m.WebAppNavPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'indiv-alumni',
    loadChildren: () => import('./indiv-alumni/indiv-alumni.module').then( m => m.IndivAlumniPageModule)
  },
  {
    path: 'indiv-alumni-list',
    loadChildren: () => import('./indiv-alumni-list/indiv-alumni-list.module').then( m => m.IndivAlumniListPageModule)
  },
  {
    path: 'connection-list',
    loadChildren: () => import('./connection-list/connection-list.module').then( m => m.ConnectionListPageModule)
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./language-popover/language-popover.module').then( m => m.LanguagePopoverPageModule)
  },
  {
    path: 'profile-vcard/:param1',
    loadChildren: () => import('./profile-vcard/profile-vcard.module').then(m => m.ProfileVcardPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
