import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpsertResourceDto } from './notification.dto';
import { NotificationServiceDomainService } from './notification.service';

@Controller('notifications')
export class NotificationServiceDomainController {
  constructor(private readonly service: NotificationServiceDomainService) {}

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
