import { Component, Input } from '@angular/core';

@Component( {
    selector: 'my-description',
    templateUrl: '/app/html/description.component.html',
    styleUrls: [ 'app/css/description.component.css' ],
})


export class DescriptionComponent {
    @Input()
    items:any;
    
    @Input()
    searched: boolean;
}