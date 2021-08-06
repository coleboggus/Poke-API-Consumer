import {Controller, Get, Injectable, Query, Req, Request} from '@nestjs/common';
import axios, {HttpService} from '@nestjs/axios'
import {map, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {Pokemon} from "./interfaces/pokemon.interface";
import {PokemonService} from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {
    }
    @Get()
    async getPokemon(@Query() query: {limit,offset}): Promise<any>{
        let pokemon = await this.pokemonService.getAllPokemon(query.offset ?? 0,query.limit ?? 20);
        pokemon = await pokemon.toPromise();
        console.log(typeof pokemon)
        console.log(pokemon)
        await Promise.all(pokemon.results.map(async (res) => {
            let fullData = await this.pokemonService.getPokemon(res.name);
            fullData = await fullData.toPromise();
            res.sprite = fullData.sprites.front_default;
        }));
        return pokemon;
    }

    @Get('count')
    async getPokemonCount(): Promise<any>{
        const count = await this.pokemonService.getCount();
        return count;
    }
    @Get('id')
    async getPokemonByID(@Query() query: {name}): Promise<any> {
        const pokemon = await this.pokemonService.getPokemon(query.name);
        return pokemon;
    }
}
