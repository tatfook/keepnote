import {Component}                           from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage}                           from '../login/login';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
	selector    : 'page-index',
	templateUrl : 'index.html',
})

export class IndexPage {
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.navCtrl.push(LoginPage, {});
	}

	ionViewDidLoad() {
	}
}
