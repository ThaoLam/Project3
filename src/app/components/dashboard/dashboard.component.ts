import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	storyName : String;
	author: String;
	numberOfChapters: String;
	kindStory: String;
	introduction: String;
  number: String;
  name: String;
  content: String;
  data: Object;
  datachapter: Object;
  storySelected: String;
  dataStory: Object;
  selectedStory: String;
  storyRemove: String;
  storyRemove1: String;
  numberdelete: String;
  imageUrl: String = "assets/img/default.png";
  fileToUpload : File = null;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
   ) { }

  ngOnInit() {
    this.authService.getStoryList().subscribe(list => {
       this.data = list.data;
    },
    err => {
       console.log(err);
       return false;
    });
    
  }
  //Show image 
  handleFileInput(file : FileList) {
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  //Add Story
  onAddStorySubmit(){
  const story = {
  	storyName: this.storyName,
  	author: this.author,
  	numberOfChapters: this.numberOfChapters,
    image:this.imageUrl,
  	kindStory: this.kindStory,
  	introduction: this.introduction
  }
    console.log(story);
   // Requires fields
    if(!this.validateService.validateStory(story)){
      alert("Please fill in all fields");
      return false;
    }

    // AddStory
    this.authService.addStory(story).subscribe(data => {
      alert(data.msg);
    });
    //load lại data
    this.authService.getStoryList().subscribe(list => {
       this.data = list.data;
    },
    err => {
       console.log(err);
       return false;
    });
    // this.form.reset();
  }

  //Add content
  onAddContentSubmit(){
  	const chapter = {
      storyName: this.storySelected,
  		number : this.number,
  		name: this.name,
  		content: this.content
  	}

  	// Requires fields
    if(!this.validateService.validateChapter(chapter)){
      alert("Please fill in all fields");
      return false;
    }
    // AddChapter
    this.authService.addChapter(chapter).subscribe(data => alert(data.msg));
  }
  // Select story
  onSelect(dataValue){
    const story = {
      storyName: dataValue
    }
    this.authService.getStory(story).subscribe(list => {
       this.dataStory = list.data;  
       console.log(this.dataStory);     
    },
    err => {
       console.log(err);
       return false;
    });
    this.authService.listchapter(story).subscribe(list => {
       this.datachapter = list.data;
    },
    err => {
       console.log(err);
       return false;
    });
  }
  // Remove story
  onRemoveStorySubmit(){
    const story = {
      storyName: this.storyRemove
    }
    this.authService.removeStory(story).subscribe(data => alert(data.msg));
    this.authService.getStoryList().subscribe(list => {
       this.data = list.data;
    },
    err => {
       console.log(err);
       return false;
    });
  }
  // Remove content
  onRemoveContentSubmit(){
    const chapter = {
      storyName: this.storyRemove1,
      number: this.numberdelete
    }
    console.log(chapter);
    this.authService.removeContent(chapter).subscribe(data => alert(data.msg));
  }

}

