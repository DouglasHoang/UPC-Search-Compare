import { Component, OnInit } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { ItemService } from './item.service';
import { Item } from './item';
import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: '/app/html/app.component.html',
    styleUrls: [ 'app/css/app.component.css' ],
    providers: [ ItemService ],
})

export class AppComponent implements OnInit {
//  items: Observable<Item[]>;
    itemName: string = "";
    itemNumber: string = "";
/*
    search(term: string) {
        console.log(this.itemService.searchEbay(term));
    }
*/

    items: Observable<string[]>;
    search (term: string) {
        this.items = this.itemService.searchEbay(term);
    }

    constructor(private itemService: ItemService) { }
}
