import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonComponent } from './button/button.component';

import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
//npm i -s @angular/flex-layout@11.0.0-beta.33
import { FlexLayoutModule } from '@angular/flex-layout';

import { FlexboxComponent } from './flexbox/flexbox.component';

@NgModule({
  declarations: [ButtonComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class DemoModule { }
