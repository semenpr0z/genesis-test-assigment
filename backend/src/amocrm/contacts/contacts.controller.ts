import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AmoCrmService } from '../amocrm.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Post()
  async createLead() {
    try {
      return await this.amoCrmService.createContact();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
