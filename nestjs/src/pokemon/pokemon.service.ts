import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";


@Injectable()
export class PokemonService {
    constructor(private httpService: HttpService) {
    }
    async getAllPokemon(offset,limit): Promise<any> {
        const pokemon = this.httpService.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).pipe(
            map(r => r.data)
        )

        return pokemon;
    }
    async getPokemon(id) :Promise<any> {
        const pokemon = this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
            map(r => r.data)
        )
        return pokemon;
    }

    async getCount() {
        const res = this.httpService.get(`https://pokeapi.co/api/v2/pokemon/?limit=1`).pipe(
            map(r => r.data.count)
        )

        return res;
    }
}
