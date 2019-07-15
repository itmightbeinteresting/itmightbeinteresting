import { Component, OnInit } from '@angular/core';
import { Creds } from 'private/private';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  loginError: boolean;
  creds: any = Creds;
  loginForm: FormGroup;
  formval: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  login() {
    if (this.loginForm.value.email !== this.creds.email || this.loginForm.value.password !== this.creds.password) {
      this.loginError = true;
    } else if (this.loginForm.value.email === this.creds.email || this.loginForm.value.password === this.creds.password) {
      sessionStorage.setItem('email', this.loginForm.value.email);
      this.router.navigate(['/addpost']);
    }
  }
}
