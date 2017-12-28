// import {HttpClient}   from '@angular/common/http';
import {Injectable}   from '@angular/core';
import {Spinner}      from 'spin.js';

/*
  Generated class for the LoadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadProvider {
    opts: any = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 0.2, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        opacity: 0.25, // Opacity of the lines
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        position: 'absolute' // Element positioning
    };
    load: any = null;

    constructor() {
    }

    createSpin(){
        if(this.load == null){
            this.load = document.createElement("div");

            this.load.style.height          = window.screen.height + "px";
            this.load.style.width           = window.screen.width + "px";
            this.load.style.position        = "absolute";
            this.load.style.backgroundColor = "black"; 
            this.load.style.opacity         = "0.2";

            new Spinner(this.opts).spin(this.load);

            document.body.appendChild(this.load);
        }
    }

    removeSpin(){
        console.log(this.load);
        if(this.load != null){
            this.load.remove();
            this.load = null;
        }
    }
}
