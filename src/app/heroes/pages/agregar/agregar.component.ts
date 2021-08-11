import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(private heroesService: HeroesService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router, 
              private snack: MatSnackBar,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }


    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroesService.getHeroePorId(id))
        )
        .subscribe((heroe)=>{
            this.heroe = heroe;
        })

  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
          .subscribe(heroe=>this.mostrarSnackbar('Registro actualizado'))
    } else {
      this.heroesService.agregarHeroe(this.heroe)
          .subscribe((resp)=>{
            this.mostrarSnackbar('Registro creado');
            this.router.navigate(['/heroes/editar', this.heroe.id]);
          });

    }

  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed()
      .pipe(
        filter(option => option),
        switchMap(()=>this.heroesService.borrarHeroe(this.heroe.id!))
      )
      .subscribe(()=>{
        this.router.navigate(['/heroes']);
      })

  }

  mostrarSnackbar(mensaje: string){
    this.snack.open(mensaje, 'ok!', {
      duration: 2500,
      data: this.heroe
    })
  }

}
