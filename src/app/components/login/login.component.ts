import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { User, UserLogin } from '../../general/model';
import { UserService, AuthenticationService } from '../../general/services';
import { AlertsService } from '../../general/services/alerts.service';

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
  userLogin= new UserLogin;
  returnUrl1: string;
  returnUrl2: string;
  user = new User;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private authService: AuthenticationService, private  userSrv: UserService,
              private alert: AlertsService) {
                this.authService.logout();

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
    this.returnUrl1 = this.route.snapshot.queryParams.returnUrl1 || 'estadisticas';
    this.returnUrl2 = this.route.snapshot.queryParams.returnUrl2 || 'home_admin';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userLogin.username = this.f.username.value;
    this.userLogin.password = this.f.password.value;
    this.authService.login(this.userLogin).subscribe(resultado => {
    
      if (resultado['access_token'] !== ('' || undefined || null)) {
        
        localStorage.setItem('token', resultado['access_token']);
        this.userSrv.getUser(resultado['username']).subscribe(resultado =>{
                this.user = resultado['data'];
                localStorage.setItem('user', JSON.stringify(this.user));
                if(this.user['rol'] === 'ADMINISTRADOR'){
                   this.router.navigate([this.returnUrl2]);
                } else if (this.user['rol'] === 'INFLUENCER'){
                   this.router.navigate([this.returnUrl1]);
                } else {
                   this.router.navigate([this.returnUrl]);
                }
    }, () =>{
      this.loading = false;
      this.alert.serverError();
     // this.authService.logout();
    });
       } else {
         this.loading = false;
         this.error = 'El usuario / contraseña son incorrectos';
         return;
       }
    }, () => {
      this.error = 'El usuario / contraseña son incorrectos';
      this.loading = false;
    });
  }
}
