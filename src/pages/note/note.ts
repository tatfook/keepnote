import {DatePipe}                                      from '@angular/common';
import {Component}                                     from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {Keyboard}                                      from '@ionic-native/keyboard';
import {InAppBrowser, InAppBrowserOptions}             from '@ionic-native/in-app-browser';
import {Camera, CameraOptions}                         from '@ionic-native/camera';
import {FileChooser}                                   from '@ionic-native/file-chooser';
import {FileOpener}                                    from '@ionic-native/file-opener';
import {NativeAudio}                                   from '@ionic-native/native-audio';
import {Headers}                                       from '@angular/http';

import {ApiProvider}                                   from '../../providers/api/api';
import {LoginPage}                                     from '../../pages/login/login';
import {SitePage}                                      from '../../pages/site/site';
import {ProfilePage}                                   from '../../pages/profile/profile';

// import 'codemirror/mode/go/go';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
                public platform: Platform, public keyboard: Keyboard, public apiProvider: ApiProvider,
                public fileChooser: FileChooser, public nativeAudio: NativeAudio, public alertCtrl: AlertController,
                public inAppBrowser: InAppBrowser) {

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
            if(this.editor && typeof(this.editor.getValue) == "function"){
                content = this.editor.getValue();
            }
        }

        this.apiProvider.setData("noteContent", content);
    }

    initCodeMirror(){
        let codeMirrorEditor:HTMLElement = <HTMLElement>document.querySelector(".CodeMirror");

        if(codeMirrorEditor){
            codeMirrorEditor.remove();
        }

        this.editorElement = <HTMLTextAreaElement>document.querySelector("#editor");

        if(this.apiProvider.getData("noteContent")){
            this.editorElement.value = this.apiProvider.getData("noteContent");
        }else{
            this.editorElement.value = "";
        }

        let config: any = {
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
        };

        if(this.platform.is("ios")){
            config.inputStyles = "textarea";
        }

        this.editor = CodeMirror.fromTextArea(this.editorElement, config);
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
        let content:string = this.editor.getValue();
        
        let currentSite:any = JSON.parse(this.apiProvider.getData("currentSite"));

        let fileName:string = currentSite.username + new DatePipe("en").transform(Date.now(),"_yyyyMMdd_HHmmss");

        let url:string = this.apiProvider.getGitlabApiBaseUrl()      +
                         "/projects/" + currentSite.projectId        +
                         "/repository/files/" + currentSite.username +
                         "/" + currentSite.sitename + "/" + fileName + ".md";

        let documentUrl = this.apiProvider.getKeepworkHost() + "/" + currentSite.username + "/" +
                          currentSite.sitename + "/" + fileName;

        let params:any = {
            commit_message : url,
            branch         : "master",
            content        : content
        };

        let headers:Headers = new Headers();
        headers.append("PRIVATE-TOKEN", this.apiProvider.getGitlabToken());

        this.apiProvider.post(url, params, headers, (data)=>{
            this.apiProvider.removeData("noteContent");
            this.initCodeMirror();

            let title: string       = "恭喜！";
            let msg: string         = "<a href=\"" + documentUrl + "\" traget=\"_blank\">" + documentUrl + "</a><br />已成功上传。";
            let buttonLeft: string  = "打开文件";
            let buttonRight: string = "确定"; 

            this.showConfirm(title, msg, buttonLeft, buttonRight, ()=>{
                this.inAppBrowser.create(documentUrl,'_blank');
            }, ()=>{});
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
            let pos = this.editor.getCursor();
            
            if(this.editor.getLine(pos.line).length == 0){
                this.editor.replaceRange("# ", CodeMirror.Pos(pos.line, 0), CodeMirror.Pos(pos.line, 0));

                let newPos = CodeMirror.Pos(pos.line, this.editor.getLine(pos.line).length);

                this.editor.focus();
                this.editor.setCursor(newPos);

                return;
            }

            if(this.editor.getLine(pos.line).length != 0){
                let str = this.editor.getLine(pos.line);
                
                let frontPart     = str.substring(0, pos.ch);
                let posteriorPart = str.substring(pos.ch, str.length);
                
                if(frontPart.length != 0){
                    let beInsert = true;
                    for(let letter in frontPart.split("")){
                        if(frontPart[letter] != "#" && frontPart[letter] != " "){
                            beInsert = false;
                            break;
                        }else{
                            if((parseInt(letter) + 1) == frontPart.length && frontPart[letter] != " "){
                                beInsert = false;
                                break;
                            }
                        }
                    }

                    if(beInsert){
                        let newStr = frontPart.substring(0, frontPart.length - 1) + "# ";
                        
                        this.editor.replaceRange(newStr, CodeMirror.Pos(pos.line, 0), CodeMirror.Pos(pos.line, pos.ch));

                        this.editor.focus();

                        let newPos = CodeMirror.Pos(pos.line, newStr.length);
                        this.editor.setCursor(newPos);
                    }else{
                        this.editor.replaceRange("\n# ",  CodeMirror.Pos(pos.line, str.length),  CodeMirror.Pos(pos.line, str.length));

                        this.editor.focus();

                        let newPos = CodeMirror.Pos(pos.line + 1, 2);
                        this.editor.setCursor(newPos);
                        return;
                    }
                }else{
                    this.editor.replaceRange("# ", CodeMirror.Pos(pos.line, 0), CodeMirror.Pos(pos.line, 0));
                 
                    this.editor.focus();

                    let newPos = CodeMirror.Pos(pos.line, 2);
                    this.editor.setCursor(newPos);
                }
                
                this.editor.focus();
                return;
            }
        }
    }

    iOSSetHeight(e: any, noteInstance: any){
        let content = window.screen.height - e.keyboardHeight;
        noteInstance.content = {"height" : content + "px"};
    }

    iOSResetHeight(e: any, noteInstance: any){
        noteInstance.content = {};
    }

    showConfirm(title: string, msg: string, buttonLeft: string, buttonRight: string, leftCallback: Function, rightCallback: Function) {
        let confirm = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: buttonLeft,
                    handler: () => {
                        leftCallback();
                    }
                },
                {
                    text: buttonRight,
                    handler: () => {
                        rightCallback();
                    }
                }
            ]
        });

        confirm.present();
    }
}
