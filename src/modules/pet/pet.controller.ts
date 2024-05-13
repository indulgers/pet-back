import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ListResult } from '@/interface';
@Controller('pet')
@ApiTags('Pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/')
  @ApiBody({ type: Pet })
  @ApiResponse({ status: 200, type: Pet })
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get('/')
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'username', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({ status: 200, type: ListResult<Pet> })
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({ status: 200, type: Pet })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.petService.remove(+id);
  }
}
