import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { Assigment } from 'src/dto/assigment.interface';
import { CreateAssigmentDto } from 'src/dto/create-assigment.dto';
import { AssigmentsService } from './assigments.service';

@Controller('posts')
export class AssigmentsController {
  constructor(private readonly AssigmentsService: AssigmentsService) {}

  @Get()
  async index(): Promise<Assigment> {
    return this.AssigmentsService.getAll();
  }

  @Get('/:id')
  async getOneById(id): Promise<Assigment> {
    return this.AssigmentsService.getOneById(id);
  }

  @Get('/title')
  async getOneByTitle(title): Promise<Assigment> {
    return this.AssigmentsService.getOneByTitle(title);
  }

  @Post('/create')
  create(@Body() createAssigmentDto: CreateAssigmentDto): Promise<Assigment> {
    return this.AssigmentsService.create(createAssigmentDto);
  }

  @Patch('/update')
  update(@Body() createAssigmentDto: CreateAssigmentDto): Promise<Assigment> {
    return this.AssigmentsService.update(createAssigmentDto);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.AssigmentsService.delete(id);
  }
}
