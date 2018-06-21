import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../services/transfer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-readpage',
	templateUrl: './readpage.component.html',
	styleUrls: ['./readpage.component.css']
})
export class ReadpageComponent implements OnInit {
	data: Object;
	dataChapter: Object;
	story: Object;
	

	constructor(
		private transfer: TransferService,
		private authService: AuthService,
		private router: Router
		) { }

	ngOnInit() {
		this.data = this.transfer.getUserStorage("chapter").chapter;
  	    this.story = this.transfer.getUserStorage("story");
		console.log(this.data);
	}

	nextChapter(dataValue){
		const chapter = {
			number: (parseInt(dataValue) + 1).toString(),
			id: this.story._id
		}
		console.log(chapter);
		this.authService.getChapterByNumber(chapter).subscribe(list => {
			console.log(list)
			this.dataChapter = list.data;
			this.transfer.clearUserStorage("chapter");
			this.transfer.setStorage("chapter", list.data);
			location.reload();
		},
		err => {
			console.log(err);
			return false;
		});

	}


	prevChapter(dataValue){
		const chapter = {
			number: parseInt(dataValue) - 1,
			id: this.story._id
		}
		console.log(chapter);
		this.authService.getChapterByNumber(chapter).subscribe(list => {

			this.dataChapter = list.data;
			this.transfer.clearUserStorage("chapter");
			this.transfer.setStorage("chapter", list.data);
			location.reload(); 
		},
		err => {
			console.log(err);
			return false;
		});

	}

	// openContent(id) {
	// 	$('#w3-show').slideToggle();
	// }
 //   // CHANGE BACKGROUND
 //   changeBackground(bg) {
 //   	if (bg == 'black') {
 //   		$("#reading").style.background = "#333";
 //   		$("#reading").style.color = "#eee";
 //   	}
 //   	else {
 //   		$("#reading").style.background = "#fff";
 //   		$("#reading").style.color = "#333";
 //   	}
 //   	createCookie('backgoundcolor', bg);
 //   }

 //   setsizeText(size) {
 //   	document.getElementById("content").style.fontSize = size + "px";
 //   }

 //   $("#maunen").change(function () {
 //   	var maunen = $("#maunen option:selected").val();
 //   	if (maunen != "262626") {
 //   		$('#main').css("background-color", "#" + maunen); $('#main').css("color", "#2B2B2B");
 //   	} else { $('#main').css("background-color", "#" + maunen); $('#main').css("color", "#c0c4c9"); }
 //   });
 //   function resizeText(zoom) {
 //   	var fontsize = parseFloat($("#content").css("font-size"));
 //   	fontsize = fontsize + zoom;
 //   	$("#content").css("font-size", fontsize + "px");
 //   }
 //   $("#fontfa").change(function () {
 //   	var font = $("#fontfa option:selected").val();
 //   	$('#content').css("font-family", font + ",serif");
 //   });
 //   $("#fonthe").change(function () {
 //   	var height = $("#fonthe option:selected").val();
 //   	$('#content').css("line-height", height + "%");
 //   });
 //   $('#setting').click(function (e) {
 //   	$('#setting-box').slideToggle();
 //   });
 //   $('#loadListChap').click(function (e) {
 //   	$('#dsChuong').slideToggle();
 //   });
}

