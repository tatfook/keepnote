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
    items: Array<any>;
    selectIndex: number;
    isLast: boolean;
    siteListContent: Array<Element>;
    siteItems: Array<Element>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.userinfo = this.navParams.get("userinfo");

        this.items = new Array<any>();
        this.items.push("/testv2/tttt");
        this.items.push("/testv2/tttt1");
        this.items.push("/testv2/tttt2");
        this.items.push("/testv2/tttt3");
        this.items.push("/testv2/tttt4");
        this.items.push("/testv2/tttt5");
        this.items.push("/testv2/tttt6");
        this.items.push("/testv2/tttt7");
    }

    ionViewDidLoad() {
        this.siteItems = Array.from(document.querySelectorAll(".site-item"));

        this.siteItems.forEach((element: HTMLElement) => {
            element.addEventListener("click", () => {
                this.setAllItem();
                element.style.marginTop = -element.parentElement.scrollTop + "px";
            });
        });

        let siteListContent:HTMLElement = document.querySelector(".site-list-content");

        siteListContent.onscroll = () => {
            this.setAllItem();

            if(this.selectIndex == this.siteItems.length - 1){
                this.isLast = false;
            }

            this.selectIndex = null;
        }
    }

    confirm(){
        this.navCtrl.push(NotePage,{});
    }

    selectItem(index: number){
        this.selectIndex = index;

        if(index == this.siteItems.length - 1){
            this.isLast = true;
        }else{
            this.isLast = false;
        }
    }

    setAllItem(){
        let ionItem:Array<Element> = Array.from(document.querySelectorAll("ion-item"));
        
        ionItem.forEach((element: HTMLElement) => {
            element.style.marginTop = null;
        });
    }
}
