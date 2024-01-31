import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router ){};

  onLogin(): void{
    this.authService.login( 'deivi@gmail.com',  '123456' )
    .subscribe( user => {
      this.router.navigate(['/']);
    })
  }

}
