import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { DescriptionComponent } from './description.component';
import { ItemComponent } from './item.component';



@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  JsonpModule ],
  declarations: [ AppComponent,
                  DescriptionComponent,
                  ItemComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
