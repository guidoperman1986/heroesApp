import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroe;

  constructor(private ar:ActivatedRoute, private heroeService: HeroesService, private router:Router) { 
    this.ar.params
    .pipe(
      switchMap(({id})=>this.heroeService.getHeroePorId(id))
    )
    .subscribe((heroe)=>{
      console.log(heroe);
      this.heroe = heroe;
    });
  }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigate(['heroes/listado']);
  }

}
