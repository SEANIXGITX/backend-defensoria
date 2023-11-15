import { MessageEnum } from '../enums/message.enum';
import { nowFormat } from './date.util';
import { toCamelCase } from './words.util';

/**
 * Convierte una Entidad a un Schema compatible con Swagger a usarse en el response del MessageResponse
 * @param model Modelo tipado o relación del modelo
 * @param props Propiedades recibidas en el decorador de Api Swagger
 * @param recursion Valor que especifica si corresponde a una llamada recursiva (no es un parámetro desde el Api Swagger)
 * @returns Schema compatible para Swagger
 */
export const classToSchema = (model, props, recursion?) => {
  if (!model.toString().includes('_OPENAPI_METADATA_FACTORY')) return null;

  const properties = model.toString().split('OPENAPI_METADATA_FACTORY')[1].split('return')[1].split(';')[0];
  let cleanString = properties.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ');
  cleanString = cleanString.replace(/}, }/g, '} }').replace(/ \(\) =>/g, '');
  cleanString = cleanString.replace(/required: true, /g, '').replace(/required: false, /g, '');
  cleanString = cleanString.replace(/, /g, ', "').replace(/: /g, '": ').replace(/{ /g, '{ "');

  cleanString = cleanString.replace(/String/g, '"string"').replace(/Number/g, '"number"');
  cleanString = cleanString.replace(/Boolean/g, '"boolean"').replace(/Object/g, '"object"');
  cleanString = cleanString.replace(/Date/g, '"string"');

  cleanString = cleanString.replace(/\("/g, '(`').replace(/"\)/g, '`)');
  cleanString = cleanString.replace(/\[ /g, '"[ ').replace(/\ ]/g, ' ]"');
  cleanString = cleanString.replace(/require\(/g, '"require(').replace(/Entity/g, 'Entity"');
  cleanString = cleanString.replace(/Enum/g, 'Enum"');

  const schema = JSON.parse(cleanString);

  Object.keys(schema).forEach(function (key) {
    if (schema[key].type.includes('require') || Array.isArray(schema[key].type)) {
      if (props.relations) {
        const isArray = schema[key].type.includes('[');
        let relationModel = schema[key].type.replace('[', '').replace(']', '');
        relationModel = fromFile(relationModel.replace('require(`', '').split('`)')[0]);
        const relationSchema = classToSchema(relationModel, { isArray: false }, true);
        if (isArray) schema[key] = { type: 'array', items: relationSchema };
        else schema[key] = relationSchema;
      } else {
        delete schema[key];
      }
    }

    if (schema[key]?.enum) delete schema[key];
  });

  if (schema['clave']) delete schema['clave'];
  if (schema['refreshToken']) delete schema['refreshToken'];

  if (!recursion) {
    switch (props.description) {
      case MessageEnum.UPDATED:
        schema.usuarioModificacion = { type: 'string', example: 'admin' };
        schema.fechaModificacion = {
          type: 'string',
          example: nowFormat(),
        };
        break;
      case MessageEnum.CREATED:
      case MessageEnum.ENTITY_SELECT:
      case MessageEnum.AUTHENTICATED:
        schema.usuarioCreacion = { type: 'string', example: 'admin' };
        schema.fechaCreacion = { type: 'string', example: nowFormat() };
        schema.usuarioModificacion = { type: 'string', example: 'admin' };
        schema.fechaModificacion = { type: 'string', example: nowFormat() };
        schema.activo = { type: 'boolean', example: true };
        break;
    }
  }

  return !props.isArray ? { properties: schema } : { type: 'array', items: { properties: schema } };
};

function fromFile(filepath: string): any {
  return require(filepath);
}

export const stringToSchema = (model: string) => {
  const stringToObject: { [key: string]: any } = {};

  model = model.replace('{', '').replace('}', '');
  model.split(',').forEach(element => {
    if (element.trim() == 'id') stringToObject.id = { type: 'number' };
    if (element.trim() == 'habilitado') stringToObject.habilitado = { type: 'boolean' };
    if (element.trim() == 'lote') stringToObject.lote = { type: 'number' };
  });
  return { properties: stringToObject };
};

export const stringToJson = (model: string) => {
  let cleanString = (model + '').replace(/\\n/g, '').replace(/\\/g, '');
  cleanString = cleanString.replace(/"{/g, '{').replace(/}"/g, '}').replace(/ /g, '');
  return JSON.parse(cleanString);
};

export const findFieldsInSqlQuery = (sqlQuery: string): string[] => {
  let selectFields: string = sqlQuery.split('FROM')[0].replace('SELECT', '').replace('DISTINCT', '').replace(/"/g, '');
  selectFields = selectFields.replace('to_char(', '').replace(`, 'dd/mm/yyyy HH24:MI')`, '');
  selectFields = selectFields.replace(/array_to_string\(array_agg\(distinct COALESCE\(/g, '').replace(/\)\),', '\)/g, '');
  const arrayFieldsWithAlias: string[] = selectFields.split(',');
  const arrayFields: string[] = arrayFieldsWithAlias.map(field => toCamelCase(field.split(' AS ')[0].trim()));
  return arrayFields;
};
