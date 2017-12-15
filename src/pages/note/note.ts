import {DatePipe}                                      from '@angular/common';
import {Component}                                     from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Keyboard}                                      from '@ionic-native/keyboard';
// import {InAppBrowser, InAppBrowserOptions}             from '@ionic-native/in-app-browser';
import {Camera, CameraOptions}                         from '@ionic-native/camera';
import {FileChooser}                                   from '@ionic-native/file-chooser';
import {FileOpener}                                    from '@ionic-native/file-opener';
import {NativeAudio}                                   from '@ionic-native/native-audio';
import {Headers}                                       from '@angular/http';

import {ApiProvider}                                   from '../../providers/api/api';
import {LoginPage}                                     from '../../pages/login/login';
import {SitePage}                                      from '../../pages/site/site';
import {ProfilePage}                                   from '../../pages/profile/profile';

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
                private platform: Platform, private keyboard: Keyboard, public apiProvider: ApiProvider,
                private fileChooser: FileChooser, private nativeAudio: NativeAudio) {

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

        window.addEventListener("keyup", () => {
            this.saveNoteContent();
        });
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

    ionViewWillLeave(){
    }

    ionViewWillUnload(){
    }

    saveNoteContent(){
        let content: string = "";

        if(this.platform.is("ios")){
            content = this.editorElement.value;
        }else{
            content = this.editor.getValue();
        }

        this.apiProvider.setData("noteContent", content);
    }

    initCodeMirror(){
        this.editorElement = <HTMLTextAreaElement>document.querySelector("#editor");

        if(this.apiProvider.getData("noteContent")){
            this.editorElement.value = this.apiProvider.getData("noteContent");
        }else{
            this.editorElement.value = "";
        }

        if(this.platform.is("ios")){
            this.editorElement.style.width         = "100%";
            this.editorElement.style.height        = "100%";
            this.editorElement.style.border        = "0px";
            this.editorElement.style.borderRadius  = "0px";
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
        if(Object.keys(this.editor).length == 0){
            alert("暂不支持iOS")
        }else{
            if(this.editor){
                this.editor.undo();
            }
        }
    }

    forward(){
        if(Object.keys(this.editor).length == 0){
            alert("暂不支持iOS")
        }else{
            if(this.editor){
                this.editor.redo();
            }
        }
    }

    save(){
        let content:string = this.apiProvider.getData("noteContent");
        
        let currentSite:any = JSON.parse(this.apiProvider.getData("currentSite"));

        let fileName:string = currentSite.username + new DatePipe("en").transform(Date.now(),"_yyyyMMdd_HHmmss");

        let url:string = this.apiProvider.getGitlabApiBaseUrl()      +
                         "/projects/" + currentSite.projectId        +
                         "/repository/files/" + currentSite.username +
                         "/" + currentSite.sitename + "/" + fileName + ".md";

        let params:any = {
            commit_message : url,
            branch : "master",
            content : content
        };

        let headers:Headers = new Headers();
        headers.append("PRIVATE-TOKEN", this.apiProvider.getGitlabToken());

        this.apiProvider.post(url, params, headers, (data)=>{
            this.apiProvider.removeData("noteContent");
            this.initCodeMirror();
            alert("文件已上传，本地数据已清空，在上keepwork.com查看");
        })
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
        //this.nativeAudio
        alert("功能开发中");
    }

    files(){
        if(this.platform.is("ios")){
            alert("暂不支持iOS");
            return;
        }

        this.fileChooser.open()
        .then(uri => console.log(uri))
        .catch(e => console.log(e));
    }

    hashtag(){
        if(Object.keys(this.editor).length == 0){
            this.editorElement.value = this.editorElement.value + "\n #";
        }else{
            var cursor = this.editor.getCursor();
            this.editor.replaceRange("# \n", CodeMirror.Pos(cursor.line, 0), CodeMirror.Pos(cursor.line, 0));
            this.editor.focus();
        }
    }

    iOSSetHeight(e: any, noteInstance: any){
        let content = window.screen.height - e.keyboardHeight;
        noteInstance.content = {"height" : content + "px"};
    }

    iOSResetHeight(e: any, noteInstance: any){
        noteInstance.content = {};
    }
}
