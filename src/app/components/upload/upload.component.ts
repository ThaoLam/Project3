import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  imageUrl: String = "assets/img/default.png";
  fileToUpload : File = null;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
   //Show image 
  handleFileInput(file : FileList) {
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      console.log(this.imageUrl)
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  summit() {
  	//todo
  	
  }

}
