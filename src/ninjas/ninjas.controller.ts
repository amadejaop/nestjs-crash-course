import { Controller, Delete, Get, Post, Put, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

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
  getOneNinja(@Param('id', ParseIntPipe) id:number) {
    try {
  return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas - create a new ninja
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
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