import {Component}                           from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SitePage}                            from '../site/site';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
    title: any = "登录";
    username: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        //this.abc = navParams.get("abc");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(){
        console.log(this.username);
        console.log(this.password);
    }

    reg(){
        alert("此功能正在开发中...");
    }
}
