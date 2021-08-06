import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pokemon-pagination.component.html',
  styleUrls: ['./pokemon-pagination.component.scss']
})
export class PokemonPaginationComponent implements OnInit {

  page = 1;
  pageSize = 10;
  pokemonData: any = {};
  allPokemonData:any = {};
  count = 0;
  active:Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    fetch(`http://localhost:3000/pokemon/count`).then(r => r.json().then(r => this.count = r))
    fetch(`http://localhost:3000/pokemon?limit=2000`).then(r => r.json().then(r => {
      this.pokemonData = r;
      this.allPokemonData = [...r.results];
      this.setActive();
    })).catch();
  }

  searchPokemon($event:Event):void{
    // @ts-ignore
    let query = $event.target.value;
    // @ts-ignore
    this.pokemonData.results = !query ? [...this.allPokemonData] : this.allPokemonData.filter((pokemon:any) => pokemon.name.includes(query));
    this.page = 1;
    this.setActive();
  }

  expandPokemon(pokemon:any):void{
    if(pokemon.expanded){
      delete pokemon.expanded;
      return
    }
    fetch(`http://localhost:3000/pokemon/id?name=${pokemon.name}`).then(r => r.json().then(r=>{
      console.log(r);
      pokemon.expanded = {weight: r.weight,generation:r.game_indices[0].version.name, moves: r.moves}
    }))

  }

  setActive() {
    this.active = this.pokemonData.results.filter((p:any,id:any) => id >= this.page*this.pageSize-9 && id < this.pageSize+this.page*this.pageSize-9 );
  }

}
