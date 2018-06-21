import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

   validateRegister(user){
     if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined ){
      return false;
     } else{
      return true;
     }
  } 
  validateEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
  }
  validateStory(story){
    if(story.storyName == undefined || story.author == undefined || story.numberOfChapters == undefined || story.kindStory == undefined || story.introduction == undefined ){
    return false;
    } else {
    return true;
    }
  }
  validateChapter(chapter){
    if(chapter.number == undefined || chapter.name == undefined || chapter.content == undefined){
      return false;
    } else {
      return true;
    }
  }

}
