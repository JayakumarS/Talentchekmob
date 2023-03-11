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
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninModule)
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
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninModule)
  },
  {
    path: 'job-search',
    loadChildren: () => import('./job-search/job-search.module').then( m => m.JobSearchPageModule)
  },

 
  
  
  
  
 
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
