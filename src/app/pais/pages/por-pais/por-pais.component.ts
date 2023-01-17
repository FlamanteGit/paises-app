import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: ['li{cursor:pointer}'],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (resp) => {
        this.hayError = false;
        this.paises = resp;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {

    if(termino === '') {
      this.mostrarSugerencias = false;
      return
    }

    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe({
      next: (resp) => {
        this.paisesSugeridos = resp.splice(0, 5);
      },
      error: () => {
        this.paisesSugeridos = [];
      },
    });
  }
}
