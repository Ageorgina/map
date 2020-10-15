import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../general/services/authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';



  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
               private authenticationService: AuthenticationService) {
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(user => {
      this.authenticationService.setCookie(this.f.username.value);
      this.router.navigate([this.returnUrl]);
    }, error => {
      // console.log('Error Login', error);
      this.error = 'El usuario / contraseña son incorrectos';
      this.loading = false;
    });
  }
}
