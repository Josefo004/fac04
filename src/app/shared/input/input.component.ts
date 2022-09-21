import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent implements OnInit {

  @Output() onEnter :EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter(); 
  @Input() terminoIn:string='';

  debouncer: Subject<string> = new Subject();

  termino:string=this.terminoIn;

  constructor() { }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(370))
      .subscribe(valor => {
        //console.log('debouncer', valor);
        this.onDebounce.emit( valor );
      });
  }

  buscar(){
    //console.log(this.termino);
    this.onEnter.emit(this.termino);
  }

  teclaPrecionada(){
    this.debouncer.next( this.termino );
    //console.log( this.termino );
  }
}
