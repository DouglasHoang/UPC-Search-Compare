import { Component, OnInit, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { ItemService } from './item.service';
import { Item } from './item';
import './rxjs-operators';
import { Subject } from 'rxjs/Subject';

declare var CryptoJS:any;
// Ady8emwvlYqAa44pThnsW9Q7c4fr0rWijasvVBm9 secret access key

@Component({
    selector: 'my-app',
    templateUrl: '/app/html/app.component.html',
    styleUrls: [ 'app/css/app.component.css' ],
    providers: [ ItemService ],
})

export class AppComponent implements OnInit {

    private searchTermStream = new Subject<string>();
    itemsEbay: Observable<String[]>;
    itemsUpc: Observable<String[]>;
    itemsAmazon: Observable<String[]>;
    
    searched: boolean = false;
    ebayJson: any;
    upcJson: any;
    amazonJson:any;

    width:number;
    loadingWidth = "0%";

    testKey: any

    test(key: any) {
        this.testKey = key;
    }

    search (term: string) {
        if (!term || term.length != 12) {
//            console.log(term.length);
            return;
        }

//        this.ebayJson = null
//        this.amazonJson = null
//        this.upcJson = null
        this.width = 4;
        this.loadingWidth = "0%";
//        this.loadingWidth = this.width + "%";
        this.searchTermStream.next(term);
        this.searched = true;

    }





    constructor(private itemService: ItemService) {
        this.itemsEbay = this.searchTermStream
        .debounceTime(0)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchEbay(term));

        this.itemsUpc = this.searchTermStream
        .debounceTime(0)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchUPC(term));


        this.itemsAmazon = this.searchTermStream
        .debounceTime(0)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchAmazon(term));


        let subscription = this.itemsEbay.subscribe(value => {
            this.ebayJson = null;
            this.width += 33;
            this.loadingWidth = this.width + "%";
            if (value.findItemsByKeywordsResponse[0].ack[0] == "Success") {
                this.ebayJson = value;
            }
        });
        let subscription1 = this.itemsUpc.subscribe(value => {
            this.upcJson = null;
            this.width += 35;
            this.loadingWidth = this.width + "%";
            if (value.code != "INVALID_UPC") {
                this.upcJson = value;
            }
        });

        let subscription2 = this.itemsAmazon.subscribe(value => {
          this.amazonJson = null;
          this.width += 34;
          this.loadingWidth = this.width + "%";
          if (!value.ItemLookupResponse[0].Items[0].Request[0].Errors) {
            this.amazonJson = value;
            console.log(value);
          }
        })

     }
}
