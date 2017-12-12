import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component}   from '@angular/core';
import {ApiProvider} from '../../providers/api/api'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
    userinfo: Object = {};

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public apiProvider: ApiProvider) {
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter(){
        let userinfo:any = JSON.parse(this.apiProvider.getData("userinfo"));

        this.userinfo = userinfo.userinfo;

        // console.log(this.userinfo);
    }

    logout(){
        this.apiProvider.removeData("currentSite");
        this.apiProvider.removeData("isLogin");
        this.apiProvider.removeData("userinfo");

        this.navCtrl.pop()
    }
}
