import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../services/transfer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.css']
})
export class InfopageComponent implements OnInit {
   data: Object;
   dataChapter: Object;
   // _id: String;
   imageUrl: String = "assets/img/default2.png"; //   assets/img/66.jpg

  constructor(
  		private transfer: TransferService,
  		private authService: AuthService,
  		private router: Router
  	) { }

  ngOnInit() {

  	this.data = this.transfer.getUserStorage("story");
    this.imageUrl = this.data.image
    // this.imageUrl = 'localhost:3000/' + this.data.image;
  	console.log(this.data)
  }

  onSelectChapter(dataValue){
  	const chapter = {
			number: dataValue,
			id: this.data._id
		}
		console.log(chapter);
		this.authService.getChapterByNumber(chapter).subscribe(list => {

		 	this.dataChapter = list.data;
			this.transfer.clearUserStorage("chapter");
			this.transfer.setStorage("chapter", list.data);
			this.router.navigate(['readpage']);    
		},
		err => {
			console.log(err);
			return false;
		});

  }


}
