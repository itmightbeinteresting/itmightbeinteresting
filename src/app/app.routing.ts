import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostsByCategoryComponent } from './categories/posts-category.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './tags/tags.component';
import { PostsByTagComponent } from './tags/posts-tag.component';
import { AboutComponent } from './about/about.component';
import { AddPostInfoComponent } from './forms/post-info.component';

const routes: Routes = [
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
    path: 'about',
    component: AboutComponent
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
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addpost',
    component: AddPostInfoComponent
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
