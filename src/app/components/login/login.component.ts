import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../general/services/authentication.service';
import {User} from "../../general/model/user";

const regex = /(\d+)/g;

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
  user: User;
  returnUrl2: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.returnUrl2 = this.route.snapshot.queryParams.returnUrl2 || 'home_admin';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(resultado => {

      if (resultado.token !== ('' || undefined || null)) {
        this.user = resultado.user;
        localStorage.setItem('token', resultado.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        if (this.user.distritos) {
          localStorage.setItem('estado', this.user.distritos[0].estado);
          localStorage.setItem('distrito', this.user.distritos[0].distrito);
        }

        /*this.estadoValue = this.user.substring(0, 3);
        this.distValue = this.user.match(regex).toString();
        this.partidoValue = this.user.slice(6);
        localStorage.setItem('user', this.user);
        localStorage.setItem('estado', this.estadoValue);
        localStorage.setItem('distrito', this.distValue);
        */


        if (this.user.username === 'ADM000ENT') {
          this.router.navigate([this.returnUrl2]);
        } else {
          this.router.navigate([this.returnUrl]);
        }

      } else {
        this.loading = false;
        this.error = 'El usuario / contraseña son incorrectos';
        return;
      }
    }, error => {
      this.error = 'El usuario / contraseña son incorrectos';
      this.loading = false;
    });
  }
}
