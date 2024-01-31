import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent {

  public searchHero = new FormControl('');

  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor(  private heroesServices: HeroesService,
                private router: Router ) {};

  searchByHero(): void {

    const query = this.searchHero.value || "";

    this.heroesServices.getSearchAutocomplete( query )
    .subscribe( heroes => this.heroes = heroes );

  };

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchHero.setValue( hero.superhero );
    // this.selectedHero =  hero;
    this.heroesServices.getHeroById( hero.id )
      .subscribe( hero => {
          this.router.navigate([`/hero/${ hero?.id }`])
      })

  }

}
