import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
  }

   onRegisterSubmit(){
    const user = {
    name: this.name,
    username: this.username,
    email: this.email,
    password: this.password
    }

    // Requires fields
    if(!this.validateService.validateRegister(user)){
        this.flashMessagesService.show('Please fill in all fields', 
        {classes: ['alert', 'alert-warning'],
        timeout: 1000});
        //this.flashMessagesService.show('Please fill in all fields',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

     // Validate email
    if(!this.validateService.validateEmail(user.email)){
        this.flashMessagesService.show('Please use a email', 
        {classes: ['alert', 'alert-warning'],
        timeout: 1000});
        //this.flashMessagesService.show('Please use a email',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show('You are now registered and can log in', 
        {classes: ['alert', 'alert-success'],
        timeout: 1000});
        //this.flashMessagesService.show('You are now registered and can log in',{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        alert(data.msg);
        this.router.navigate(['/register']);
      }
    });
  }

}
