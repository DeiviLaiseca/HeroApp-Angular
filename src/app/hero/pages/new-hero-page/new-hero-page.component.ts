import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/hero.interface';

import { HeroesService } from '../../services/heroes.service';

import { filter, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from '../../components/config-dialog/config-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css']
})
export class NewHeroPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl('')
  });

  public publisher = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog ) {};

  ngOnInit(): void {

    if( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroeService.getHeroById( id ))
    ).subscribe( hero => {

      if( !hero ) return this.router.navigateByUrl('/');

      this.heroForm.reset( hero );

      return;
    })

  };

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ){
      this.heroeService.updateHero( this.currentHero )
      .subscribe( hero => {
        this.showSnackbar(`${ hero.superhero } se ha actualizado correctamente`)
      });
      return;
    }

    this.heroeService.addHero( this.currentHero )
    .subscribe( hero => {
      this.router.navigate(['hero/edit', hero.id])
      this.showSnackbar(`${ hero.superhero } se ha creado correctamente`)
    })
  }

  onDeleteHero(): void{
    if( !this.currentHero.id ) throw Error('El Id del héroe es requerido');

    const dialogRef = this.dialog.open( ConfigDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this.heroeService.deleteHeroById( this.currentHero.id )),
          filter(( wasDeleted: boolean ) => wasDeleted )
      )
      .subscribe( () => {
        this.router.navigate(['/hero'])
    })

    // Este codigo se a optimizado por el bloque anterior
    // dialogRef.afterClosed().subscribe( result => {
    //   if (!result ) return;

    //   this.heroeService.deleteHeroById( this.currentHero.id )
    //   .subscribe( wasDeleted => {
    //     if( wasDeleted ) this.router.navigate(['/hero'])
    //   })
    // });
  }

  showSnackbar(message: string ): void{
    this.snackbar.open( message, 'Cerrar', { duration : 2500 });
  }

}
