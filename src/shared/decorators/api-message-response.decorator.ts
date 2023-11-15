import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { MessageResponse } from 'src/shared/entities/message-response';
import { MessageEnum } from 'src/shared/enums/message.enum';
import { classToSchema, stringToSchema } from 'src/shared/utils/transform-class.util';

/**
 * Decoradores personalizados para visualizarse en Swagger
 * @param statusArray
 * @param description
 * @returns MessageResponse de acuerdo a un tipo.
 */
export const ApiExtraMessageResponse = (statusArray: number[], description?: string) => {
  const decorators = [];
  statusArray.forEach(status => {
    let data = { type: null, example: null };

    if (!description) {
      switch (status) {
        case HttpStatus.UNAUTHORIZED:
          description = MessageEnum.UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          description = MessageEnum.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          description = MessageEnum.NOT_EXIST;
          break;
        case HttpStatus.CONFLICT:
          description = MessageEnum.EXIST;
          break;
        case HttpStatus.PRECONDITION_FAILED:
          description = MessageEnum.ERROR_PRECONDITION_FAILED;
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          description = MessageEnum.UNPROCESSABLE;
          data = { type: 'array', example: ['Descripción error 1'] };
          break;
      }
    }

    decorators.push(
      ApiResponse({
        status,
        description,
        schema: {
          allOf: [
            {
              properties: {
                statusCode: { type: 'number', example: status },
                message: { type: 'string', example: description },
                data,
              },
            },
          ],
        },
      }),
    );
    description = null;
  });

  return applyDecorators(...decorators);
};

const ApiCustomResponse = <TModel extends Type<any> | any>(props: {
  model: TModel;
  status: number;
  description?: string;
  isArray?: boolean;
  relations?: boolean;
}) => {
  let example: string;
  let data = {};
  const model = <Type<any>>props.model;

  if (props.isArray) example = MessageEnum.ENTITY_SELECT;
  else if (props.description) example = props.description;

  const modelName = typeof props.model === 'string' ? props.model : model.name;
  const description = `Respuesta en base a MessageResponse< ${modelName}${props.isArray ? '[]' : ''} >`;
  const title = `MessageResponse<${modelName}${props.isArray ? '[]' : ''}>`;

  if (model.name == 'PaginationResult') data = { type: 'array', items: { $ref: getSchemaPath(model) } };
  else if (typeof props.model === 'string') data = stringToSchema(props.model);
  else data = classToSchema(model, props);

  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [];
  decorators.push(ApiExtraModels(MessageResponse, model));
  decorators.push(
    ApiResponse({
      status: props.status,
      description,
      schema: {
        title,
        allOf: [
          { $ref: getSchemaPath(MessageResponse) },
          {
            properties: {
              statusCode: { type: 'number', example: props.status },
              message: { type: 'string', example },
              data,
            },
          },
        ],
      },
    }),
  );

  return decorators;
};

export const ApiMessageResponse = <TModel extends Type<any> | any>(props: {
  model: TModel;
  status: number;
  description?: string;
  isArray?: boolean;
  relations?: boolean;
}) => {
  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [];

  decorators.push(...ApiCustomResponse(props));
  decorators.push(ApiExtraMessageResponse([HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN]));
  decorators.push(ApiExtraMessageResponse([HttpStatus.UNPROCESSABLE_ENTITY]));

  if (props.description === MessageEnum.CREATED || props.description === MessageEnum.UPDATED)
    decorators.push(...ApiCustomResponse({ status: HttpStatus.CONFLICT, description: MessageEnum.EXIST, model: props.model }));

  return applyDecorators(...decorators);
};
