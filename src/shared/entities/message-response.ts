import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse<T> {
  @ApiProperty()
  statusCode: number; // Código de respuesta

  @ApiProperty()
  message: string; // Mensaje de texto de respuesta, así como un resultado más complejo tipo JSON

  @ApiProperty()
  data: T; // data_tipo_JSON

  constructor(statusCode?: number, message?: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
