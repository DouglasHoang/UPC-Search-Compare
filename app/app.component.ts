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

    ebayJson: any;
    upcJson: any;


    search (term: string) {
        if (!term) {
            return;
        }
        this.searchTermStream.next(term);

    }





    constructor(private itemService: ItemService) {
        this.itemsEbay = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchEbay(term));

        this.itemsUpc = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchUPC(term));



        let subscription = this.itemsEbay.subscribe(value => {console.log(value); this.ebayJson = value});
        let subscription1 = this.itemsUpc.subscribe(value => {console.log(value); this.upcJson = value});

     }
}
