import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
        username: this.username,
        password: this.password
     }

    this.authService.authenticateUser(user).subscribe(data => {
        //console.log(data);
        if(data.success){
           this.authService.storeUserData(data.token, data.user);
           this.flashMessagesService.show('You are now login', 
           {classes: ['alert', 'alert-success'],
           timeout: 5000});
           //this.flashMessagesService.show('You are now login',{cssClass: 'alert-danger', timeout: 3000});
           this.router.navigate(['']);
        } else {
           this.flashMessagesService.show(data.msg, 
           {classes: ['alert', 'alert-danger'],
           timeout: 5000});
           //this.flashMessagesService.show(data.msg,{cssClass: 'alert-danger', timeout: 3000});
           this.router.navigate(['login']);
        }
     });

}
}