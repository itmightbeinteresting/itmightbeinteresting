import { Component, OnInit } from '@angular/core';
import { Creds } from 'private/private';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  creds: any = Creds;
  loginForm: FormGroup;
  formval: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  login() {
    if (this.loginForm.value.email !== this.creds.email) {
      console.log('Wrong email!');
    }
  }

}
