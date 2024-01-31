import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidenavItems = [
    { label: 'Listado', icon:'recent_actors', url:'./list'},
    { label: 'Añadir', icon:'person_add', url:'./new-hero'},
    { label: 'Buscar', icon:'manage_search', url:'./search'}
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {};

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
