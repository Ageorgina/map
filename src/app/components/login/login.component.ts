import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../general/services/authentication.service';
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
  estadoValue: string;
  partidoValue: string;
  distValue: string;
  user: string;

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
    if (this.loginForm.invalid) { return; }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(resultado => {
      if (resultado === 'e') {
        this.loading = false;
        this.error = 'El usuario / contraseña son incorrectos';
        return ;
      }
      if (resultado.token !== ('' || undefined || null) ) {
        this.user = resultado.user;
        this.estadoValue = this.user.substring(0, 3);
        this.distValue = this.user.match(regex).toString();
        this.partidoValue = this.user.slice(6);
        localStorage.setItem('user', this.user);
        localStorage.setItem('token', resultado.token);
        localStorage.setItem('partido', this.partidoValue);
        localStorage.setItem('estado', this.estadoValue);
        localStorage.setItem('distrito', this.distValue);
        this.router.navigate([this.returnUrl]);
      }
    }, error => {
      this.error = 'El usuario / contraseña son incorrectos';
      this.loading = false;
    });
  }
}
