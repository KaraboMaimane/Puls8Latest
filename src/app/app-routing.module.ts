import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadChildren: () => import('../pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('../pages/start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'identity',
    loadChildren: () => import('../pages/identity/identity.module').then(m => m.IdentityPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'dj-profile',
    loadChildren: () => import('../pages/dj-profile/dj-profile.module').then(m => m.DjProfilePageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('../pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
  },
  {
    path: 'edit-dj-profile',
    loadChildren: () => import('../pages/edit-dj-profile/edit-dj-profile.module').then(m => m.EditDjProfilePageModule)
  },
  {
    path: 'edit-user-profile',
    loadChildren: () => import('../pages/edit-user-profile/edit-user-profile.module').then(m => m.EditUserProfilePageModule)
  },
  {
    path: 'view-profile',
    loadChildren: () => import('../pages/view-profile/view-profile.module').then(m => m.ViewProfilePageModule)
  },
  {
    path: 'chatroom',
    loadChildren: () => import('../pages/chatroom/chatroom.module').then(m => m.ChatroomPageModule)
  },
  {
    path: 'chat-request',
    loadChildren: () => import('../pages/chat-request/chat-request.module').then(m => m.ChatRequestPageModule)
  },
  {
    path: 'view-chat-request',
    loadChildren: () => import('../pages/view-chat-request/view-chat-request.module').then(m => m.ViewChatRequestPageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('../pages/instructions/instructions.module').then(m => m.InstructionsPageModule)
  },
  {
    path: 'track-upload',
    loadChildren: () => import('../pages/track-upload/track-upload.module').then(m => m.TrackUploadPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('../pages/upload/upload.module').then(m => m.UploadPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
