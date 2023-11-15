export enum MessageEnum {
  AUTHENTICATED = 'Autenticación Correcta!',
  UNAUTHORIZED = 'No Autenticado, las credenciales expiraron o no se proporcionaron.',
  FORBIDDEN = 'No Autorizado, las credenciales no tienen permisos para la acción solicitada.',
  UNPROCESSABLE = 'Error al procesar la solicitud.',
  BAD_REQUEST = 'No se logró completar la operación.',
  UNSAVED_FILE = 'Error al guardar el archivo',
  NOT_EXIST_FILE = 'No existe el archivo solicitado',
  INVALID_FILE = 'Error de validación (archivo esperado)',
  INVALID_PARAMS = 'Parámetros no permitidos',
  INVALID_USER = 'El usuario No Existe!',
  INVALID_PASSWORD = 'Contraseña incorrecta del usuario',
  INVALID_CREDENTIAL = 'Usuario o Contraseña incorrectos',
  URL_GENERADA = 'Generación de URL exitosamente.',

  OK = 'La solicitud se ha procesado correctamente.',
  ENTITY_SELECT = 'Datos devueltos correctamente.',
  ENTITY_SELECT_EMPTY = 'No se encontraron registros.',
  ERROR_CREATE = 'Error: Los datos no fueron almacenados correctamente.',
  ERROR_UPDATE = 'Error: Los datos no fueron modificados correctamente.',
  ERROR_DELETE = 'Error: Los datos no fueron eliminados (lógico) correctamente.',
  ERROR_PAGINATION = 'Error: Alguno(s) de lo(s) parámetro(s) de búsqueda/ordenación no existe(n).',
  ERROR_PRECONDITION_FAILED = 'Error: Los datos no cumplen una condición específica.',

  CREATED = 'El registro fue creado correctamente.',
  UPDATED = 'El registro fue modificado correctamente.',
  ENABLED = 'El estado de Habilitado fue modificado correctamente.',
  DELETED = 'El registro fue dado de baja correctamente.',
  EXIST = 'El registro ya Existe!',
  NOT_EXIST = 'El registro No Existe!',

  FECHA_INICIO_NO_VALIDA = 'Fecha inicio no válida; debe enviar una fecha en formato yyyy-mm-dd.',
  FECHA_FIN_NO_VALIDA = 'Fecha fin no válida; debe enviar una fecha en formato yyyy-mm-dd.',

  /******************** Específicos ********************/

  PERSONA_PRESENTADO_POR_ERROR_DELETE = 'No se puede remover la persona con id especificado, ya figura en una causa como presentadoPor.',
  PERSONA_FALTAN_DATOS = 'Faltan datos para registrar la persona.',

  PERSONA_PRESENTA_FALTAN_NOMBRES = 'Falta dato de nombres de la persona persona que presenta.',
  PERSONA_PRESENTA_FALTAN_PRIMER_APELLIDO = 'Falta dato del primer apellido de la persona persona que presenta.',
  PERSONA_PRESENTA_FALTAN_SEGUNDO_APELLIDO = 'Falta dato del segundo apellido de la persona persona que presenta.',

  NOT_EXIST_ROL = 'El rol No Existe!',
  NOT_EXIST_MENU = 'El menu No Existe!',
  NOT_EXIST_PERMISO = 'El permiso No Existe!',
}

export class Message {
  static idNotExists = (id: any) => `El ${Object.keys(id)} ${Object.values(id)} No Existe!`;
  static idInvalidParams = (id: any, entityName: string) =>
    `El ${Object.keys(id)} ${Object.values(id)} es un Parametro no permitido de ${entityName}!`;
  static exists = (entityName: string) => `El registro de ${entityName} ya Existe!`;
  static notExists = (entityName: string, id: any) => `El registro de ${entityName} ${id ? id + ', ' : ''}No Existe!`;
  static notRequirements = (entityName: string, id: any) =>
    `El registro de ${entityName} ${id ? id + ', ' : ''}No cumple con los requerimientos para continuar!`;
  static errorCreate = (entityName: string) => `Error: Los datos de ${entityName} no fueron almacenados correctamente.`;
  static errorUpdate = (entityName: string) => `Error: Los datos de ${entityName} no fueron modificados correctamente.`;
  static errorDelete = (entityName: string) => `Error: Los datos de ${entityName} no fueron dados de baja correctamente.`;
  static errorSelect = (entityName: string) => `Error: Los datos de ${entityName} no fueron obtenidos correctamente.`;
}
