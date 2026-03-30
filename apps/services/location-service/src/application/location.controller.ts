import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpsertResourceDto } from './location.dto';
import { LocationServiceDomainService } from './location.service';

@Controller('locations')
export class LocationServiceDomainController {
  constructor(private readonly service: LocationServiceDomainService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: UpsertResourceDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpsertResourceDto) {
    return this.service.update(id, dto);
  }
}
