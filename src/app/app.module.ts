import {NgModule, ErrorHandler}                   from '@angular/core';
import {BrowserModule}                            from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Keepnote}                                 from './app.component';

import {IndexPage} from '../pages/index/index';
import {LoginPage} from '../pages/login/login';
import {SitePage}  from '../pages/site/site';
import {NotePage}  from '../pages/note/note';
// import {AboutPage}    from '../pages/about/about';
// import {ContactPage}  from '../pages/contact/contact';
// import {HomePage}     from '../pages/home/home';
// import {TabsPage}     from '../pages/tabs/tabs';

import {StatusBar}    from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpModule}   from '@angular/http';

@NgModule({
    declarations: [
        Keepnote,
        IndexPage,
        LoginPage,
        SitePage,
        NotePage,
        // AboutPage,
        // ContactPage,
        // HomePage,
        // TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(Keepnote),
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Keepnote,
        IndexPage,
        LoginPage,
        SitePage,
        NotePage,
        // AboutPage,
        // ContactPage,
        // HomePage,
        // TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide  : ErrorHandler,
            useClass : IonicErrorHandler
        }
    ]
})

export class AppModule {}
