import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Keyboard}     from '@ionic-native/keyboard';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';

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

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private platform: Platform, private keyboard: Keyboard, private inAppBrowser: InAppBrowser) {

        let iab = this.inAppBrowser;
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
        let editor:HTMLElement = <HTMLElement>document.querySelector("#editor");

        if(this.platform.is("ios")){
            editor.style.width  = "100%";
            editor.style.height = "100%";
        }else{
            CodeMirror.fromTextArea(editor, {
                //mode: 'markdown',
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
                // foldOptions: {
                //     rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.markdown, CodeMirror.fold.xml, CodeMirror.fold.wikiCmdFold),
                //     clearOnEnter: false,
                // },
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                //全屏模式
                fullScreen:true,
                //括号匹配
                matchBrackets: true,
                // lint: true,
            });
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
