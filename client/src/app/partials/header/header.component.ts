import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.clearStorage();
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  isAuthenticated(): Boolean{
    return this.authService.isAuthenticated();
  }

  authenticatedUser(): any{
    const user = this.authService.authenticatedUser();
    type ObjectKey = keyof typeof user;
    const key = 'displayName' as ObjectKey;

    return user[key];
  };

}
