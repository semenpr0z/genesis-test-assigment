import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmService } from './amocrm.service'; // Исправлено на AmoCrmService
import { LeadsController } from './leads/leads.controller';
import { ContactsController } from './contacts/contacts.controller';
import { CompaniesController } from './companies/companies.controller';

@Module({
  imports: [HttpModule],
  controllers: [LeadsController, ContactsController, CompaniesController],
  providers: [AmoCrmService]
})
export class AmoCrmModule {}
