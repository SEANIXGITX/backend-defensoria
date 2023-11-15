import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { FormularioEntity } from './entities/formulario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageResponse } from 'src/shared/entities/message-response';
import { Message, MessageEnum } from 'src/shared/enums/message.enum';

@Injectable()
export class FormularioService {
  entityNameMessage = 'Formulario';

  constructor(@InjectRepository(FormularioEntity) private formularioRepository: Repository<FormularioEntity>) {}

  create(createFormularioDto: CreateFormularioDto) {
    return 'This action adds a new formulario';
  }

  findAll() {
    return `This action returns all formulario`;
  }

  async listarColumnas(codigoFormulario: number): Promise<MessageResponse<FormularioEntity[]>> {
    const lista = await this.formularioRepository
      .find({ where: { codigo: codigoFormulario, activo: true }, order: { orden: 'ASC' } })
      .catch(e => {
        throw new UnprocessableEntityException(e.message, Message.errorSelect(this.entityNameMessage));
      });
    if (lista.length < 1) {
      return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT_EMPTY, []);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, lista);
  }

  findOne(id: number) {
    return `This action returns a #${id} formulario`;
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  remove(id: number) {
    return `This action removes a #${id} formulario`;
  }
}
