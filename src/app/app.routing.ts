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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    component: LandingComponent
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
    path: 'categories/:slug',
    component: PostsByCategoryComponent
  },
  {
    path: ':slug',
    component: PostComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
