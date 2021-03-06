import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonController } from './pokemon/pokemon.controller';
import {HttpModule} from "@nestjs/axios";
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, PokemonController],
  providers: [AppService, PokemonService],
})
export class AppModule {}
