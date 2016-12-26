import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import './rxjs-operators';

@Component({
    selector: 'my-item',
    templateUrl: '/app/html/item.component.html',
    styleUrls: [ 'app/css/item.component.css' ],
})

export class ItemComponent {

    @Input()
    items: Observable<String[]>;
    @Input()
    itemName:string;
    
}