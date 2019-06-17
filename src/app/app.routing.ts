import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { PostComponent } from './post/post.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostsByCategoryComponent } from './categories/posts-category.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './tags/tags.component';
import { PostsByTagComponent } from './tags/posts-tag.component';

const routes: Routes = [
  // {
  //   path: 'user-profile',
  //   component: ProfileComponent
  // },
  // {
  //   path: 'register',
  //   component: SignupComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'category/:slug',
    component: PostsByCategoryComponent
  },
  {
    path: 'tag/:slug',
    component: PostsByTagComponent
  },
  {
    path: ':slug',
    component: PostComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
