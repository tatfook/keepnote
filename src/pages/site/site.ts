import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NotePage} from '../note/note';

/**
 * Generated class for the SitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-site',
    templateUrl: 'site.html',
})
export class SitePage {
    userinfo: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.userinfo = this.navParams.get("userinfo");
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SitePage');
    }

    confirm(){
        this.navCtrl.push(NotePage,{});
    }
}
