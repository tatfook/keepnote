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

    isLast: any        = {};
    isSetListener: any = {};
    selectIndex: any   = {};
    list: any          = {};
    canExecute:boolean = true;

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

        this.selectIndex.mine   = null;
        this.selectIndex.theirs = null;
    }

    ionViewDidLoad() {}

    confirm(){
        this.navCtrl.push(NotePage,{});
    }

    selectItem(event: any, index: number, type: String): any{
        this.setAllUnselected(true);

        if(type == "mine"){
            this.selectIndex.mine = index;

            if(index == this.items.length - 1){
                this.isLast.mine = true;
            }else{
                this.isLast.mine = false;
            }
        }else if(type == "theirs"){
            this.selectIndex.theirs = index;

            if(index == this.items.length - 1){
                this.isLast.theirs = true;
            }else{
                this.isLast.theirs = false;
            }
        }

        event.path.forEach(element => {
            if(element.tagName == "ION-ITEM"){
                this.setListContentListener(element.parentElement, type);
                this.setAllItemMarginTopNull(element.parentElement);
                element.style.marginTop = -element.parentElement.scrollTop + "px";

                if(type == "mine") {
                    this.list.mine = element.parentElement;
                }else if(type == "theirs"){
                    this.list.theirs = element.parentElement;
                }
            }
        });
    }

    setAllItemMarginTopNull(element: HTMLElement){
        if(element){
            let childNodes: Array<any> = Array.from(element.childNodes);
            
            childNodes.forEach(innerElement => {
                if(innerElement.tagName == "ION-ITEM"){
                    innerElement.style.marginTop = null;
                }
            });
        }
    }

    setListContentListener(element: HTMLElement, type: String){
        let that = this;

        function set(){
            element.addEventListener("scroll", () => {
                that.setAllItemMarginTopNull(element);
    
                if(that.selectIndex.mine == that.items.length - 1){
                    that.isLast.mine = false;
                }

                if(that.selectIndex.theirs == that.items.length - 1){
                    that.isLast.theirs = false;
                }

                that.setAllUnselected(false);
            });
        }

        if(type == "mine" && !this.isSetListener.mine){
            this.isSetListener.mine = true;
            set();
        }
        
        if(type == "theirs" && !this.isSetListener.theirs){
            this.isSetListener.theirs = true;
            set();
        }
    }

    setAllUnselected(isFromItem: boolean){
        if(isFromItem){
            this.canExecute = false;

            setTimeout(() => {
                this.canExecute = true;
            }, 10)
        }

        if(isFromItem || this.canExecute){
            this.selectIndex.mine   = null;
            this.selectIndex.theirs = null;

            this.setAllItemMarginTopNull(this.list.mine);
            this.setAllItemMarginTopNull(this.list.theirs);
        }
    }
}
