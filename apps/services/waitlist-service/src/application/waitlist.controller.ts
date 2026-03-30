import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpsertResourceDto } from './waitlist.dto';
import { WaitlistServiceDomainService } from './waitlist.service';

@Controller('waitlists')
export class WaitlistServiceDomainController {
  constructor(private readonly service: WaitlistServiceDomainService) {}

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
