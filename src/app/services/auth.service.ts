import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: Http
    ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }
  addStory(story){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/dashboard', story, {headers: headers})
       .map(res => res.json());
  }
   addChapter(chapter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/addChapter', chapter, {headers: headers})
       .map(res => res.json());
  }
  getStory(story){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/story', story, {headers: headers})
       .map(res =>res.json());
  }
  getStoryById(storyid){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/story_infos/storybyid?_id=' + storyid._id, {headers: headers})
       .map(res =>res.json());
  }
   getChapterByNumber(chapter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/story_infos/chapterbynumber?number='+chapter.number +'&id='+chapter.id, {headers: headers})
       .map(res =>res.json());
  }
  listchapter(story){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/listchapter', story, {headers: headers})
       .map(res =>res.json());
  }
  removeStory(story){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/removeStory', story, {headers: headers})
       .map(res =>res.json());
  }
  removeContent(chapter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/story_infos/removeContent', chapter, {headers: headers})
       .map(res => res.json());
  }


  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getStoryList(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/story_infos/liststory',{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  loadToken(){
    const token = localStorage.getItem('id token');
    this.authToken = token;
  }
  
  loggedIn() {
   return tokenNotExpired('id token');
  }

  isAdmin() {
    //console.log(this.user);
    if(this.user !== undefined) {
      return this.user['admin'];
    }
    else return false;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
