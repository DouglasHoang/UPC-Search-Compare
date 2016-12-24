import { Component, OnInit } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { ItemService } from './item.service';
import { Item } from './item';
import './rxjs-operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'my-app',
    templateUrl: '/app/html/app.component.html',
    styleUrls: [ 'app/css/app.component.css' ],
    providers: [ ItemService ],
})

export class AppComponent implements OnInit {

    private searchTermStream = new Subject<string>();
    items: Observable<String[]>;
    itemName: string = "";
    itemNumber: string = "";
    errorMsg:string;
    item: any;
    

    search (term: string) {
        if (!term) {
            return;
        }
        this.searchTermStream.next(term);
    }



    constructor(private itemService: ItemService) {
        this.items = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.itemService.searchEbay(term));
     }
}
