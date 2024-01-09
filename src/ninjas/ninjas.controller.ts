import { Controller, Delete, Get, Post, Put, Param, Query, Body, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {

  }
  // GET /ninjas -> [] - returns a collection of ninjas
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchuks') {
    // const service = new NinjasService();
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id -> {...} - returns a single ninja based on the id
  @Get(':id')
  getOneNinja(@Param('id') id:string) {
    try {
  return this.ninjasService.getNinja(+id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas - create a new ninja
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }
  // PUT /ninjas/:id -> {...} - update a ninja
  @Put(':id')
  updateNinja(@Param('id') id:string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto)
  }
  // DELETE /ninjas/:id - deletes a ninja based on id
  @Delete(':id')
  removeNinja(@Param('id') id:string) {
    return this.ninjasService.removeNinja(+id);
  }
}