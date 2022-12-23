import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.isAuthenticated()){
      this.router.navigate(['/tasks']);
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((user) => {
      this.authService.setUserInfo(user);
      this.router.navigate(['/tasks']);
    }, (error) => {
      alert("Invalid credentials!");
      console.log(`Error Login: ${ error }`);
    })
  }

  isAuthenticated(): Boolean{
    return this.authService.isAuthenticated();
  }

}
