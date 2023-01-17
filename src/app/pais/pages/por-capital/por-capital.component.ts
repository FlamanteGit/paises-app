import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = []
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  
  constructor(private paisService: PaisService) {
    
  }

  buscar(termino: string) {
    this.hayError = false
    this.termino = termino;

    this.paisService.buscarCapital(this.termino).subscribe({
      next: (resp) => {
        this.hayError = false;
        this.paises = resp
      },
      error: (err) => {
        this.hayError = true;
        this.paises = []
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

    this.paisService.buscarCapital(termino).subscribe({
      next: (resp) => {
        this.paisesSugeridos = resp.splice(0, 5);
      },
      error: () => {
        this.paisesSugeridos = [];
      },
    });
  }
}
