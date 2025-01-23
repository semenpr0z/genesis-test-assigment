import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AmoCrmService } from '../amocrm.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Post()
  async createCompany() {
    try {
      return await this.amoCrmService.createCompany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
