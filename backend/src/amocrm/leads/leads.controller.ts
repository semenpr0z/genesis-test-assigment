import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AmoCrmService } from '../amocrm.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Post()
  async createLead() {
    try {
      return await this.amoCrmService.createLead();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}