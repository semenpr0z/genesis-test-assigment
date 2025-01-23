import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AmoCrmService {
  private readonly baseHeaders = {
    'Content-Type': 'application/json',
    'X-Client-Id': '32185358',
  };

  constructor(private readonly httpService: HttpService) {}

  /**
   * Получение OAuth токена.
   */
  async getOAuthToken() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php',
          { headers: this.baseHeaders },
        ),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Общий метод для создания сущности (контакта, сделки, компании).
   */
  private async createEntity(
    entityType: 'contacts' | 'leads' | 'companies',
    payload: any,
  ) {
    try {
      const { base_domain, access_token } = await this.getOAuthToken();
      const url = `https://${base_domain}/api/v4/${entityType}`;

      const createdEntityResponse = await firstValueFrom(
        this.httpService.post(url, [payload], {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      const entityId =
        createdEntityResponse.data._embedded?.[entityType]?.[0]?.id;

      if (!entityId) {
        throw new Error(
          `Не удалось создать сущность: ${entityType}. Ответ сервера некорректен.`,
        );
      }

      return await this.getEntityById(entityType, entityId, access_token, base_domain);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Получение сущности по ID с кастомным форматированием.
   */
  private async getEntityById(
    entityType: 'contacts' | 'leads' | 'companies',
    entityId: number,
    access_token: string,
    base_domain: string,
  ) {
    try {
      const url = `https://${base_domain}/api/v4/${entityType}/${entityId}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      const entity = response.data;
      return {
        id: entity.id,
        name: entity.name,
        entity_type: entityType,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Создание контакта.
   */
  async createContact() {
    return await this.createEntity('contacts', { price: 0 });
  }

  /**
   * Создание сделки.
   */
  async createLead() {
    return await this.createEntity('leads', { price: 0 });
  }

  /**
   * Создание компании.
   */
  async createCompany() {
    return await this.createEntity('companies', { price: 0 });
  }

  /**
   * Универсальная обработка ошибок.
   */
  private handleError(error: any) {
    return error.response?.data || error;
  }
}
