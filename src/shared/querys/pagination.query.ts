import { BadRequestException, HttpStatus } from '@nestjs/common';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { MessageResponse } from '../entities/message-response';
import { PaginationResult } from '../entities/pagination-result';
import { MessageEnum } from '../enums/message.enum';
import { findFieldsInSqlQuery } from '../utils/transform-class.util';
import { getIfIncludes } from '../utils/words.util';

export async function paginateQuery(qb: SelectQueryBuilder<BaseEntity>, options: PaginationDto, plain = false) {
  const take = options.perPage || 10;
  const page = options.page || 1;
  const skip = (page - 1) * take;
  const arrayFields: string[] = findFieldsInSqlQuery(qb.getQuery());

  options.sort?.forEach(item => {
    const qbField = getIfIncludes(arrayFields, item.field);
    qb.addOrderBy(`${qbField}`, item.orderType);
  });

  options.search?.forEach(item => {
    let fields = '';
    if (typeof item.keyword === 'number' || typeof item.keyword === 'boolean') {
      item.fields.forEach((field: string) => {
        const qbField = getIfIncludes(arrayFields, field);
        fields += `${qbField}=${item.keyword} OR `;
      });
      qb.andWhere(fields.substring(0, fields.length - 3));
    } else {
      item.fields.forEach((field: string) => (fields += `COALESCE(${getIfIncludes(arrayFields, field)}, '') || `));
      qb.andWhere(`LOWER(${fields.substring(0, fields.length - 3)}) like '%${item.keyword.replace(/ /g, '%').toLowerCase()}%'`);
    }
  });

  let result: any[];
  let total: number;
  if (plain) {
    total = (await qb.getRawMany()).length;
    result = await qb
      .offset(skip)
      .limit(take)
      .getRawMany()
      .catch(e => {
        throw new BadRequestException({ message: MessageEnum.ERROR_PAGINATION, data: e.message });
      });
  } else {
    [result, total] = await qb
      .skip(skip)
      .take(take)
      .getManyAndCount()
      .catch(e => {
        throw new BadRequestException({ message: MessageEnum.ERROR_PAGINATION, data: e.message });
      });
  }

  const response = new PaginationResult();
  response.pagination.totalItems = total;
  response.pagination.itemCount = result.length;
  response.pagination.perPage = take;
  response.pagination.from = take * (page - 1) + 1;
  response.pagination.to = response.pagination.from + response.pagination.itemCount - 1;
  response.pagination.currentPage = page;
  response.pagination.lastPage = Math.ceil(total / take);
  response.pagination.nextPage = page + 1 > response.pagination.lastPage ? null : page + 1;
  response.pagination.prevPage = page - 1 < 1 ? null : page - 1;
  response.result = result.length > 0 ? result : [];

  const message = result.length > 0 ? MessageEnum.ENTITY_SELECT : MessageEnum.ENTITY_SELECT_EMPTY;
  return new MessageResponse(HttpStatus.OK, message, response);
}
