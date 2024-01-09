import { Controller, Delete, Get, Post, Put, Param, Query, Body } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
  // GET /ninjas -> [] - returns a collection of ninjas
  @Get()
  getNinjas(@Query('type') type: string) {
    return [{type}];
  }

  // GET /ninjas/:id -> {...} - returns a single ninja based on the id
  @Get(':id')
  getOneNinja(@Param('id') id:string) {
  return {
    id,
  };
  }

  // POST /ninjas - create a new ninja
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return {
      name: createNinjaDto.name,
    }
  }
  // PUT /ninjas/:id -> {...} - update a ninja
  @Put(':id')
  updateNinja(@Param('id') id:string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return {
      id,
      name: updateNinjaDto.name,
    };
  }
  // DELETE /ninjas/:id - deletes a ninja based on id
  @Delete(':id')
  removeNinja(@Param('id') id:string) {
    return {
      id,
    };
  }
}