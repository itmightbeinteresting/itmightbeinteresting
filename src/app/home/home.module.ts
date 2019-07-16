import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SectionsModule } from '../sections/sections.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SectionsModule,
    ToastModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    MessageService
  ]
})
export class HomeModule { }
