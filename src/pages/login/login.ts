import {Component}                           from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {SitePage}                            from '../site/site';

import {ApiProvider}                         from '../../providers/api/api';

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
    title    : any = "登录";
    username : string;
    password : string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvide: ApiProvider,
                public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        
    }

    login(){
        if(!this.username || !this.password){
            let alert = this.alertCtrl.create({
                title: '登录错误',
                subTitle: '用户名密码必填',
                buttons: ['确定']
            });

            alert.present();

            return;
        }

        let params: object = {
            username: this.username,
            password: this.password
        }

        this.apiProvide.post(this.apiProvide.getKeepworkApiBaseUrl() + "user/login", params, null, (data) => {
            if(data && data.error && data.error.id == 0){
                this.apiProvide.setData("isLogin", "true");
                this.apiProvide.setData("userinfo", JSON.stringify(data.data));
                this.navCtrl.push(SitePage, {});
            }else{
                alert(data.error.message);
            }
        })

        
        // console.log(this.request);
        // this.request.map(res => console.log(res));
    }

    reg(){
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: '此功能正在开发中...',
            buttons: ['确定']
        });

        alert.present();

        return;
    }
}
