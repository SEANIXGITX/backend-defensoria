import { ApiExtraMessageResponse } from '../../../shared/decorators/api-message-response.decorator';
import { MessageEnum } from '../../../shared/enums/message.enum';
import { classToSchema } from '../../../shared/utils/transform-class.util';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiAuthResponse = <TModel extends Type<any>>(props: {
  model: TModel;
  description: string;
  isArray?: boolean;
  relations?: boolean;
}) => {
  const description = `Respuesta en base a MessageResponse< ${props.model.name}${props.isArray ? '[]' : ''} >`;
  const schema = classToSchema(props.model, props);
  const model = schema ? schema : {};

  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [];
  decorators.push(
    ApiResponse({
      status: HttpStatus.OK,
      description,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: HttpStatus.OK },
          message: { type: 'string', example: props.description },
          response: {
            properties: {
              token: { type: 'string' },
              refreshToken: { type: 'string' },
              ...model,
            },
          },
        },
      },
    }),
  );

  decorators.push(ApiExtraMessageResponse([HttpStatus.UNAUTHORIZED], MessageEnum.INVALID_PASSWORD));
  decorators.push(ApiExtraMessageResponse([HttpStatus.NOT_FOUND], MessageEnum.NOT_EXIST + ' | ' + MessageEnum.INVALID_USER));

  return applyDecorators(...decorators);
};

export const ApiAuthRefreshResponse = (message: string) => {
  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [];
  decorators.push(
    ApiResponse({
      status: HttpStatus.OK,
      description: `Respuesta en base a MessageResponse<{token,refreshToken,id_usuario}>`,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: HttpStatus.OK },
          message: { type: 'string', example: message },
          response: {
            properties: {
              token: { type: 'string' },
              refreshToken: { type: 'string' },
              id: { type: 'number' },
            },
          },
        },
      },
    }),
  );
  // fix id_usuario por id
  decorators.push(ApiExtraMessageResponse([HttpStatus.UNAUTHORIZED]));

  return applyDecorators(...decorators);
};
