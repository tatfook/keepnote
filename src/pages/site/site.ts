import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component}   from '@angular/core';
import {NotePage}    from '../note/note';
import {ApiProvider} from "../../providers/api/api";

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
    items: any          = {};
    isLast: any         = {};
    isSetListener: any  = {};
    selectIndex: any    = {};
    list: any           = {};
    currentSite: any    = {};
    canExecute: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public apiProvider: ApiProvider) {

        let userinfoStr: string = apiProvider.getData("userinfo");
        let userinfo: any  = {};

        try {
            userinfo = JSON.parse(userinfoStr);
        } catch (error) {
            
        }

        this.items.mine   = [];
        this.items.theirs = [];

        apiProvider.post(apiProvider.getKeepworkApiBaseUrl() + "site_data_source/getByUsername", {username: userinfo.userinfo.username},(data) => {
            this.items.mine = data.data;
        });

        apiProvider.post(apiProvider.getKeepworkApiBaseUrl() + "site_user/getSiteListByMemberName", {memberName: userinfo.userinfo.username}, (data) => {
            this.items.theirs = data.data;
        });

        this.selectIndex.mine   = null;
        this.selectIndex.theirs = null;
    }

    ionViewDidLoad() {}

    ionViewWillEnter() {
        this.navCtrl.remove(0, 100);
    }

    confirm(){
        this.apiProvider.setData("currentSite", JSON.stringify(this.currentSite));

        this.navCtrl.push(NotePage,{});
        
        this.currentSite = null;
    }

    selectItem(event: any, index: number, type: String): any{
        this.setAllUnselected(true);

        if(type == "mine"){
            this.selectIndex.mine = index;

            if(index == this.items.mine.length - 1){
                this.isLast.mine = true;
            }else{
                this.isLast.mine = false;
            }
        }else if(type == "theirs"){
            this.selectIndex.theirs = index;

            if(index == this.items.theirs.length - 1){
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

        this.setCurrentSite(index, type);
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
    
                if(that.selectIndex.mine == that.items.mine.length - 1){
                    that.isLast.mine = false;
                }

                if(that.selectIndex.theirs == that.items.theirs.length - 1){
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

            this.isLast.mine   = false;
            this.isLast.theirs = false;

            this.setAllItemMarginTopNull(this.list.mine);
            this.setAllItemMarginTopNull(this.list.theirs);
        }        
    }

    setCurrentSite(index: number, type: String){
        console.log(index);
        console.log(type);

        if(type == "mine"){
            this.currentSite = this.items.mine[index];
            console.log(this.currentSite);
        }else if(type == "theirs"){
            this.currentSite = this.items.theirs[index];
        }
    }
}
