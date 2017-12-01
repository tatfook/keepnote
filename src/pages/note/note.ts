import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Keyboard}  from '@ionic-native/keyboard';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private keyboard: Keyboard) {
        let noteInstance = this;

        if(this.platform.is("ios")){
            window.addEventListener('native.keyboardshow', function(e){
                noteInstance.iOSSetHeight(e, noteInstance);
            });
        
            window.addEventListener("native.keyboardhide", function(e){
                noteInstance.iOSResetHeight(e, noteInstance);
            });
        }
    }

    ionViewDidLoad() {
        var editor = document.querySelector("#editor");

        CodeMirror.fromTextArea(editor, {
            lineNumbers : true,
            inputStyle  : "textarea",
        });
    }

    iOSSetHeight(e: any, noteInstance: any){
        let content = window.screen.height - e.keyboardHeight;
        noteInstance.content = {"height" : content + "px"};
    }

    iOSResetHeight(e: any, noteInstance: any){
        noteInstance.content = {};
    }

}
