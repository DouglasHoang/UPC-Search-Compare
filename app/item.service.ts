import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Item } from './item';

import { Observable } from 'rxjs/Observable';

declare var CryptoJS:any;

// secret key Ady8emwvlYqAa44pThnsW9Q7c4fr0rWijasvVBm9
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

        return this.jsonp.get(ebayUrl, {search: params}).map(response => <string[]> response.json()).catch(this.handleError);

    }

    searchAmazon(term: string) {

/*  Amazon search not available yet

            var hash = CryptoJS.HmacSHA256("GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&ItemId=0679722769&Operation=ItemLookup&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews&Service=AWSECommerceService&Timestamp="+ this.getTimeStamp(), "PFThIve6mJbL0c3GX9qKV+oWfHBXqGpKB6k9apQP");
            var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

            hashInBase64 = hashInBase64.replace("=", "%3D");
            hashInBase64 = hashInBase64.replace("+", "%2B");

            var url = "https://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAJJULMZAIRV5GEOLA&AssociateTag=dh4ang-20&ItemId=0679722769&Operation=ItemLookup&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews&Service=AWSECommerceService&Timestamp="+ this.getTimeStamp() + "&Signature=" + hashInBase64;


            
                    
            const headers = new Headers();
            headers.append('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,x-api-key');
            headers.append('Access-Control-Allow-Methods', 'GET, POST');
            headers.append('Access-Control-Allow-Origin', '*');
            
            


            return this.http.get(url, {headers: headers})
            .map(res => <string[]> res.json());
            
*/
            
    }

    searchUPC(term: string) {

        let upcUrl = "https://api.upcitemdb.com/prod/trial/lookup";
        let params = new URLSearchParams();
        params.set('upc', term);
        return this.http.get(upcUrl, {search: params}).map(response => <string[]> response.json()).catch(this.handleError);

    }

    getTimeStamp() {
            var currentdate = new Date();
            var year = currentdate.getUTCFullYear();
            var monthNumber = currentdate.getUTCMonth() + 1;
            var month;
            if (monthNumber < 10) {
                month = "0" + monthNumber.toString();
            }
            else {
                month = monthNumber.toString();
            }
            var dayNumber = currentdate.getUTCDate();
            var day;
            if (dayNumber < 10) {
                day = "0" + dayNumber.toString();
            }
            else {
                day = dayNumber.toString();
            }
            var hourNumber = currentdate.getUTCHours();
            var hour;
            if (hourNumber < 10) {
                hour = "0" + hourNumber.toString();
            }
            else {
                hour = hourNumber.toString();
            }
            var minuteNumber = currentdate.getUTCMinutes();
            var minute;
            if (minuteNumber < 10) {
                minute = "0" + minuteNumber.toString();
            }
            else {
                minute = minuteNumber.toString();
            }
            var secondNumber = currentdate.getUTCSeconds();
            var second;
            if (secondNumber < 10) {
                second = "0" + secondNumber.toString();
            }
            else {
                second = secondNumber.toString();
            }
            var date = year + "-" + month + "-" + day + "T" + hour + "%3A" + minute + "%3A" + second + "Z";
            return date;


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