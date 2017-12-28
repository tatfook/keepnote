//import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable}                          from 'rxjs/Observable';
import {Http, Headers, RequestOptions}       from '@angular/http';
import {LoadProvider}                        from '../load/load';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ApiProvider {
    keepworkHost: string = "http://keepwork.com";
    keepworkApi: string  = this.keepworkHost + "/api/wiki/models/";
    storage: any;
    request: Observable<any>;

    constructor(public http: Http, public load: LoadProvider) {
        if(typeof window.localStorage == "object"){
            this.storage = window.localStorage;
        }
    }
    
    public getKeepworkHost(): string{
        return this.keepworkHost;
    }

    public getKeepworkApiBaseUrl():string{
        return this.keepworkApi;
    }

    public getGitlabApiBaseUrl():string{
        let userinfo:any = JSON.parse(this.getData("userinfo"));
        let url:string   = "";

        if(userinfo && userinfo.userinfo && userinfo.userinfo.defaultSiteDataSource && userinfo.userinfo.defaultSiteDataSource.apiBaseUrl){
            return userinfo.userinfo.defaultSiteDataSource.apiBaseUrl;
        }

        return "";
    }

    public getGitlabToken():string {
        let userinfo:any = JSON.parse(this.getData("userinfo"));
        let url:string   = "";

        if(userinfo && userinfo.userinfo && userinfo.userinfo.defaultSiteDataSource && userinfo.userinfo.defaultSiteDataSource.dataSourceToken){
            return userinfo.userinfo.defaultSiteDataSource.dataSourceToken;
        }

        return "";
    }

    public setData(key: string, value: string):any {
        if(this.storage){
            this.storage.setItem(key, value);
        }
    }

    public getData(key: string):string {
        if(this.storage){
            return this.storage.getItem(key);
        }
    }

    public removeData(key: string):any {
        if(this.storage){
            this.storage.removeItem(key);
        }
    }

    public post(url:string, params: object, headers: Headers, callback: Function):any {
        this.load.createSpin();
        let optionsParams:any = {};

        if(headers){
            optionsParams.headers = headers;
        }

        let options:RequestOptions = new RequestOptions(optionsParams);

        this.http.post(url, params, options)
        .map(res => res.json())
        .subscribe(data => {
            this.load.removeSpin();
            callback(data);
        })
    }

}
