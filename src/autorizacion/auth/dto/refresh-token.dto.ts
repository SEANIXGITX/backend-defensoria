import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'El campo refreshToken no debe ser vacío' })
  @IsString({ message: 'El campo refreshToken debe ser de tipo cadena' })
  refreshToken: string;
}
