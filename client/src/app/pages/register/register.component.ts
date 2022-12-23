import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user!: User;
  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';
  displayName: string = '';
  picture!: File;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.username === "" || this.password === "" || this.password2 === "" || this.email === "" || this.displayName === ""){
      alert('All fields are required!');
    }
    else if(this.password != this.password2){
      alert('Passwords should match!');
    }
    else{
      this.user = {
        username: this.username,
        password: this.password,
        email: this.email,
        displayName: this.displayName
      }

      this.authService.registerUser(this.user).subscribe(() => {
        console.log(`User registration success: ${ this.user }`);
        this.router.navigate(['login']);
      }, (error) => {
        alert("User already exists!");
        console.log(`Error: ${ error }`);
      })
    }
  }

}
