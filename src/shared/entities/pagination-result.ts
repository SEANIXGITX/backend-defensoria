import { ApiProperty } from '@nestjs/swagger';

class Pagination {
  @ApiProperty({ description: 'Cantidad total de registros existentes' })
  totalItems: number;

  @ApiProperty({ description: 'Cantidad de registros devueltos' })
  itemCount: number;

  @ApiProperty({ description: 'Cantidad de registros solicitados por página', default: 10 })
  perPage: number;

  @ApiProperty({ description: 'Posición o contador de registros en el listado del registro inicial obtenido' })
  from: number;

  @ApiProperty({ description: 'Posición o contador de registros en el listado del registro final obtenido' })
  to: number;

  @ApiProperty({ description: 'Número de página actual', default: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Número de la página siguiente, puede ser nulo cuando no existe una siguiente página', default: null })
  nextPage?: number;

  @ApiProperty({ description: 'Número de la página anterior, puede ser nulo cuando no existe una anterior página', default: null })
  prevPage?: number;

  @ApiProperty({ description: 'Número de la última página', default: 1 })
  lastPage: number;
}

export class PaginationResult {
  @ApiProperty({ description: 'Datos de la paginación de los registros devueltos' })
  pagination: Pagination;

  @ApiProperty({ description: 'Lista de los registros devueltos' })
  result: any[];

  constructor() {
    this.pagination = new Pagination();
  }
}
