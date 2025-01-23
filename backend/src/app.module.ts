import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmModule } from './amocrm/amocrm.module';

@Module({
  imports: [HttpModule, AmoCrmModule],
})
export class AppModule {}