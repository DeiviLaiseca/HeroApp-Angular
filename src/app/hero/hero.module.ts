import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroRoutingModule } from './hero-routing.module';
import { MaterialModule } from '../material/material.module';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/heroImage.pipe';
import { ConfigDialogComponent } from './components/config-dialog/config-dialog.component';



@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewHeroPageComponent,
    SearchPageComponent,
    HeroCardComponent,
    HeroImagePipe,
    ConfigDialogComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroModule { }
