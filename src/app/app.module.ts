import {NgModule, ErrorHandler}                   from '@angular/core';
import {BrowserModule}                            from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Keepnote}                                 from './app.component';

import {NotePage}    from '../pages/note/note';
import {LoginPage}   from '../pages/login/login';
import {SitePage}    from '../pages/site/site';
import {ProfilePage} from '../pages/profile/profile';

// import {AboutPage}    from '../pages/about/about';
// import {ContactPage}  from '../pages/contact/contact';
// import {HomePage}     from '../pages/home/home';
// import {TabsPage}     from '../pages/tabs/tabs';

import {StatusBar}    from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpModule}   from '@angular/http';
import {Keyboard}     from '@ionic-native/keyboard';
import {InAppBrowser} from '@ionic-native/in-app-browser';
//import {HttpClient}   from '@angular/common/http';
import {ApiProvider}  from '../providers/api/api';

@NgModule({
    declarations: [
        Keepnote,
        NotePage,
        LoginPage,
        SitePage,
        ProfilePage,
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
        NotePage,
        LoginPage,
        SitePage,
        ProfilePage,
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
        },
        Keyboard,
        InAppBrowser,
        //HttpClient,
        ApiProvider
    ]
})

export class AppModule {}
