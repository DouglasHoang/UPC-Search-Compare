import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Item } from './item';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class ItemService {



    constructor(private http: Http, private jsonp: Jsonp) {}

    searchEbay(term: string) {

//        let ebayUrl = 'http://en.wikipedia.org/w/api.php';
        
   
        let ebayUrl = "https://svcs.ebay.com/services/search/FindingService/v1";
        let params = new URLSearchParams();
        params.set('SECURITY-APPNAME', 'DouglasH-Testing-PRD-d45ed6035-71fec55d');
        params.set('OPERATION-NAME', 'findItemsByKeywords');
        params.set('SERVICE-VERSION', '1.0.0');
        params.set('RESPONSE-DATA-FORMAT', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        params.set('keywords', term);
        params.set('paginationInput.entriesPerPage', '5');
        params.set('GLOBAL-ID', 'EBAY-US');
        params.set('siteid', '0'); 

/*
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');

        
*/      

        return this.jsonp.get(ebayUrl, {search: params}).map(response => <string[]> response.json().findItemsByKeywordsResponse[0].searchResult[0].item).catch(this.handleError);

    }

    getItems(): Observable<Item[]> {
        return;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
//            const body = error.json() || '';
//           const err = body.error || JSON.stringify(body);
//            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
//            errMsg = error.message ? error.message : error.toString();
        }
        console.error("error api");
        return Observable.throw("error api");
        }
}