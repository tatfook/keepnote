import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    }

    ionViewDidLoad() {
        var editor = document.querySelector("#editor");

        CodeMirror.fromTextArea(editor, {
            lineNumbers : true
        });

        this.platform.platforms();

        window.addEventListener("native.keyboardshow", function(e){
        //console.log(e.keyboardHeight);
        });
    
        window.addEventListener("native.keyboardhide", function(e){
        console.log(222222);
        })
    }

}
