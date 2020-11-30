import { Body, Controller, Get, Post } from '@nestjs/common';
import { Assigment } from 'src/dto/assigment.interface';
import { CreateAssigmentDto } from 'src/dto/create-assigment.dto';
import { AssigmentsService } from './assigments.service';

@Controller('posts')
export class AssigmentsController {
  constructor(private readonly AssigmentsService: AssigmentsService) {}

  @Get()
  async index(): Promise<Assigment[]> {
    return this.AssigmentsService.get();
  }

  @Post()
  create(@Body() createAssigmentDto: CreateAssigmentDto): any {
    this.AssigmentsService.create(createAssigmentDto);
    return createAssigmentDto;
  }
}
