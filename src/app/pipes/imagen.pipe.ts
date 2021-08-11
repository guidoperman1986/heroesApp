import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../heroes/interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id) {
      return 'assets/no-image.png';
    } else if ( heroe.alt_img ) {
      return heroe.alt_img;
    }

    return `assets/heroes/${heroe.id}.jpg`;
  }
}
