//import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable}                          from 'rxjs/Observable';
import {Http}                                from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ApiProvider {
    keepworkApi: string = "http://keepwork.com/api/wiki/models/";
    storage: any;
    request: Observable<any>;

    constructor(public http: Http) {
        if(typeof window.localStorage == "object"){
            this.storage = window.localStorage;
        }
    }
    
    public getKeepworkApiBaseUrl(): string{
        return this.keepworkApi;
    }

    public setData(key: string, value: string): any{
        if(this.storage){
            this.storage.setItem(key, value);
        }
    }

    public getData(key: string): string{
        if(this.storage){
            return this.storage.getItem(key);
        }
    }

    public removeData(key: string): any{
        if(this.storage){
            this.storage.removeItem(key);
        }
    }

    public post(url:string, params: object, callback: Function): any{
        this.http.post(url, params)
        .map(res => res.json())
        .subscribe(data => {
            callback(data);
        })
    }

}
