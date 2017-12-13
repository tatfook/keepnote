import {Component}                                     from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Keyboard}                                      from '@ionic-native/keyboard';
// import {InAppBrowser, InAppBrowserOptions}             from '@ionic-native/in-app-browser';
import {ApiProvider}                                   from '../../providers/api/api';
import {LoginPage}                                     from '../../pages/login/login';
import {SitePage}                                      from '../../pages/site/site';
import {ProfilePage}                                   from '../../pages/profile/profile';
import {Camera, CameraOptions}                         from '@ionic-native/camera';

declare var CodeMirror;

/**
 * Generated class for the NotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})

export class NotePage {
    content: object = {};
    editorElement: HTMLTextAreaElement;
    editor: any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
                private platform: Platform, private keyboard: Keyboard, public apiProvider: ApiProvider) {

        //let iab = this.inAppBrowser;

        platform.ready().then(() => {
            //iab.create('./assets/codemirror/codemirror.html','_blank');
        })

        let instance:Object = this;

        // if(this.platform.is("ios")){
        //     window.addEventListener('native.keyboardshow', function(e){
        //         noteInstance.iOSSetHeight(e, noteInstance);
        //     });
        
        //     window.addEventListener("native.keyboardhide", function(e){
        //         noteInstance.iOSResetHeight(e, noteInstance);
        //     });
        // }
    }

    ionViewDidLoad() {
    }

	ionViewWillEnter(){
		if(this.apiProvider.getData("isLogin") == "true"){
            if(!this.apiProvider.getData("currentSite")){
                this.navCtrl.push(SitePage, {});
            }
		}else{
			this.navCtrl.push(LoginPage, {});
        }
        
        this.initCodeMirror();
	}


    initCodeMirror(){
        this.editorElement = <HTMLTextAreaElement>document.querySelector("#editor");

        this.editorElement.value = "<script>var a = '11111';</script>";

        if(this.platform.is("ios")){
            this.editorElement.style.width        = "100%";
            this.editorElement.style.height       = "100%";
            this.editorElement.style.border       = "0px";
            this.editorElement.style.borderRadius = "0px";
            this.editorElement.style.paddingTop    = "20px";
        }else{
            this.editor = CodeMirror.fromTextArea(this.editorElement, {
                mode: 'markdown',
                lineNumbers: true,
                theme: "default",
                viewportMargin: Infinity,
                //绑定Vim
                //keyMap:"vim",
                //代码折叠
                lineWrapping: true,
                indentUnit:1,
                smartIndent:true,
                foldGutter: true,
                foldOptions: {
                    rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.markdown, CodeMirror.fold.xml),
                    clearOnEnter: false,
                },
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                //全屏模式
                fullScreen:true,
                //括号匹配
                matchBrackets: true,
                // lint: true,
            });
        }
    }

    profile(){
        this.navCtrl.push(ProfilePage, {});
    }

    settings(){
        this.navCtrl.push(SitePage, {});
    }

    backward(){
        if(this.editor){
            this.editor.undo();
        }
    }

    forward(){
        if(this.editor){
            this.editor.redo();
        }
    }

    save(){

    }

    useCamera(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }

    record(){

    }

    files(){

    }

    hashtag(){

    }

    iOSSetHeight(e: any, noteInstance: any){
        let content = window.screen.height - e.keyboardHeight;
        noteInstance.content = {"height" : content + "px"};
    }

    iOSResetHeight(e: any, noteInstance: any){
        noteInstance.content = {};
    }
}
