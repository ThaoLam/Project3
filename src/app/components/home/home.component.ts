import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';
import { TransferService } from '../../services/transfer.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
	data: Object;
	dataStory: Object;

	constructor(
		private router: Router,
		private validateService: ValidateService,
		private authService: AuthService,
		private flashMessagesService: FlashMessagesService,
		private transfer : TransferService
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
	onSelect(dataValue){
		const storyid = {
			_id: dataValue
		}
		console.log(dataValue);
		this.authService.getStoryById(storyid).subscribe(list => {

			this.dataStory = list.data;
			this.transfer.clearUserStorage("story");
			this.transfer.setStorage("story",list.data);
			this.router.navigate(['infopage']);    
		},
		err => {
			console.log(err);
			return false;
		});
	}

}
