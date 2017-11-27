import {Component}                           from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SitePage}                            from '../site/site';
import {Observable}                          from 'rxjs/Observable';
import {Http}                                from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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
    api      : string = "http://localhost:8099/api/wiki/models";
    title    : any = "登录";
    username : string = "testv2";
    password : string = "12345678";
    request  : Observable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
        //this.abc = navParams.get("abc");
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad LoginPage');
    }

    login(){
        // console.log(this.username);
        // console.log(this.password);
        if(!this.username || !this.password){
            alert("用户名密码必填");
            return;
        }

        this.http.post(this.api + "/user/login", {username : this.username, password : this.password})
        .map(res => res.json())
        .subscribe(data => {
            //console.log(data);

            if(data.error.id == 0){
                this.navCtrl.push(SitePage, {userinfo : data.data});
            }
        })

        // console.log(this.request);
        // this.request.map(res => console.log(res));
    }

    reg(){
        alert("此功能正在开发中...");
    }
}
