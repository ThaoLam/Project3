import { Injectable } from '@angular/core';


@Injectable()
export class TransferService {
	
	constructor() { }

	data: Object;

	// setData(data){
	// 	this.data = data;
	// }
	// getData(){
	// 	let temp = this.data;
	// 	return temp;
	// }
	setStorage(storageName, data) {
		localStorage.setItem(storageName, JSON.stringify(data));
	}

	getUserStorage(storageName) {
		let data = localStorage.getItem(storageName);
		return JSON.parse(data);
	}

	clearUserStorage(storageName) {
		localStorage.removeItem(storageName);
	}

	cleanAll() {
		localStorage.clear()
	}
}
