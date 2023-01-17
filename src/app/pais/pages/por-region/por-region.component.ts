import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  activarRegion(region: string) {
    if (region === this.regionActiva) {
      return;
    }

    this.regionActiva = region;

    this.paisService.buscarRegión(this.regionActiva).subscribe({
      next: (resp) => {
        this.paises = resp;
        console.log(this.paises);
      },
      error: (err) => {
        this.paises = [];
        console.log(this.paises);
      },
    });
  }
}
