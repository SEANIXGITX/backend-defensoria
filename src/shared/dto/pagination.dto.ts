import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @ApiProperty({ description: 'Número de página a obtener del listado', default: 1 })
  @IsInt({ message: 'El campo page debe ser un entero' })
  readonly page?: number;

  @IsOptional()
  @ApiProperty({ description: 'Cantidad de registros a seleccionar por página', default: 10 })
  @IsInt({ message: 'El campo perPage debe ser un entero' })
  readonly perPage?: number;

  @IsOptional()
  @ApiProperty({
    example: '[{ "fields": [ "campo1Tabla" ], "keyword": "palabra" }]',
    description: `Criterio de búsqueda.\n
      - Cada objeto '{ "fields": [ "campo1Tabla" ], "keyword": "palabra" }' representa a un filtro filtro de búsqueda, si existe otro objeto, se considera como un AND\n
      - El campo 'fields' tiene un array de campos del listado resultante a buscarse, si se aumentan elementos, equivale a una concatenación o un OR para buscar en la palabra clave\n
      - El campo 'keyword' representa la palabra clave a buscar en el array de campos (fields) especificado\n
      - Si existen objetos anidados en el listado, se debe escribir según el último nivel del objeto en el formato "entidad.campo1Tabla"`,
  })
  @IsArray({ message: 'search: se esperaba un arreglo' })
  readonly search?: any[];

  @IsOptional()
  @ApiProperty({
    example: '[{ "field": "campoTabla", "orderType": "ASC/DESC" }]',
    description: `Criterio de orden.\n
      - Cada objeto '{ "field": "campoTabla", "orderType": "ASC/DESC" }' representa un criterio de orden\n
      - Si existe más de un objeto, se toma en cuenta como un criterio orden adicional, representando el anterior especificado\n
      - El campo 'field' representa el campo por el cual se requiere ordenar el listado\n
      - El campo 'orderType' representa el tipo de orden que puede ser ASC o DESC, uno de los dos, no ambos`,
  })
  @IsArray({ message: 'search: se esperaba un arreglo' })
  readonly sort?: any[];
}
